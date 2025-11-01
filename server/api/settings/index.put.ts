import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readBody(event);

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

    // Update settings
    const updated = await prisma.siteSettings.update({
      where: { id: "global" },
      data: {
        ...(body.footerAddress !== undefined && {
          footerAddress: body.footerAddress,
        }),
        ...(body.footerPhone !== undefined && {
          footerPhone: body.footerPhone,
        }),
        ...(body.footerEmail !== undefined && {
          footerEmail: body.footerEmail,
        }),
        ...(body.socialFacebook !== undefined && {
          socialFacebook: body.socialFacebook,
        }),
        ...(body.socialTwitter !== undefined && {
          socialTwitter: body.socialTwitter,
        }),
        ...(body.socialInstagram !== undefined && {
          socialInstagram: body.socialInstagram,
        }),
        ...(body.socialYoutube !== undefined && {
          socialYoutube: body.socialYoutube,
        }),
        ...(body.aboutDescription !== undefined && {
          aboutDescription: body.aboutDescription,
        }),
        ...(body.aboutImageUrl !== undefined && {
          aboutImageUrl: body.aboutImageUrl,
        }),
        ...(body.heroTitle !== undefined && { heroTitle: body.heroTitle }),
        ...(body.heroSubtitle !== undefined && {
          heroSubtitle: body.heroSubtitle,
        }),
        ...(body.heroImageUrl !== undefined && {
          heroImageUrl: body.heroImageUrl,
        }),
        ...(body.ctaTitle !== undefined && { ctaTitle: body.ctaTitle }),
        ...(body.ctaDescription !== undefined && {
          ctaDescription: body.ctaDescription,
        }),
        ...(body.ctaButtonText !== undefined && {
          ctaButtonText: body.ctaButtonText,
        }),
        ...(body.ctaButtonUrl !== undefined && {
          ctaButtonUrl: body.ctaButtonUrl,
        }),
      },
    });

    return successResponse("Settings updated successfully", updated);
  } catch (error: any) {
    console.error("Update settings error:", error);
    return errorResponse("Failed to update settings", error.message);
  }
});
