import bcrypt from 'bcryptjs';
import prisma from '../../utils/db';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import { errorResponse, successResponse } from '../../utils/response';
import { validateEmail, validatePassword } from '../../utils/validation';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { email, name, password } = body;

        // Validation
        if (!email || !name || !password) {
            return errorResponse('Email, name, and password are required');
        }

        if (!validateEmail(email)) {
            return errorResponse('Invalid email format');
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            return errorResponse(passwordError.message);
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return errorResponse('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'AUTHOR', // Default role
            },
        });

        // Generate tokens
        const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Store refresh token
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                userId: user.id,
            },
        });

        // Set refresh token as HTTP-only cookie
        setCookie(event, 'refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return successResponse('User registered successfully', {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            accessToken,
        });
    } catch (error: any) {
        console.error('Registration error:', error);
        return errorResponse('Registration failed', error.message);
    }
});
