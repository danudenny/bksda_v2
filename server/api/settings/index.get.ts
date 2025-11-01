import prisma from "../../utils/db";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Get or create global settings
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "global",
          footerAddress: "",
          footerPhone: "",
          footerEmail: "",
        },
      });
    }

    return successResponse("Settings retrieved successfully", settings);
  } catch (error: any) {
    console.error("Get settings error:", error);
    return errorResponse("Failed to retrieve settings", error.message);
  }
});
