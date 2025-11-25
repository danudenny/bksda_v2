import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";
import { useAuth, requireAdmin } from "../../utils/auth";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);
    const { name, email, password, role, isActive } = body;

    if (!name || !email || !password) {
      return errorResponse("Name, email, and password are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "AUTHOR",
        isActive: isActive !== undefined ? isActive : true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return successResponse("User created successfully", newUser);
  } catch (error: any) {
    console.error("Create user error:", error);
    return errorResponse("Failed to create user", error.message);
  }
});
