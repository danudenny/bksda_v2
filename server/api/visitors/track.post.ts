import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
    const userAgent = getHeader(event, "user-agent") || "unknown";
    const referer = getHeader(event, "referer") || "direct";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      success: true,
      message: "Visit recorded",
    };
  } catch (error) {
    console.error("Failed to record visit:", error);

    return {
      success: false,
      message: "Failed to record visit",
    };
  }
});
