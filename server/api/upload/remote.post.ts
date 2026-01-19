import { successResponse, errorResponse } from "../../utils/response";
import cloudinary from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event as any);
    const sourceUrl = body?.url as string;
    const folder = (body?.folder as string) || "bksda_v2/uploads";

    if (!sourceUrl || typeof sourceUrl !== "string") {
      return errorResponse("Source URL is required");
    }

    // Ensure Cloudinary configured
    const config = useRuntimeConfig();
    cloudinary.config({
      cloud_name: config.cloudinaryCloudName,
      api_key: config.cloudinaryApiKey,
      api_secret: config.cloudinaryApiSecret
    });

    const result = await (cloudinary as any).uploader.upload(sourceUrl, {
      folder,
      resource_type: "image",
    });

    return successResponse("Imported successfully", {
      url: result.secure_url || result.url,
      filename: result.public_id,
      mimetype: result.format ? `image/${result.format}` : undefined,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
    });
  } catch (err: any) {
    console.error("Cloudinary remote upload error:", err);
    return errorResponse("Failed to import into Cloudinary", err.message || "");
  }
});
