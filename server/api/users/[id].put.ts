import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";
import { useAuth, requireAdmin } from "../../utils/auth";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);

    const id = getRouterParam(event, "id");
    if (!id) {
      return errorResponse("User ID is required");
    }

    const body = await readBody(event);
    const { name, email, password, role, isActive } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return errorResponse("User not found");
    }

    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
      if (emailExists) {
        return errorResponse("Email already in use");
      }
    }

    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(hashedPassword && { password: hashedPassword }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return successResponse("User updated successfully", updatedUser);
  } catch (error: any) {
    console.error("Update user error:", error);
    return errorResponse("Failed to update user", error.message);
  }
});
