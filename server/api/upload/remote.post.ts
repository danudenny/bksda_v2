import { successResponse, errorResponse } from "../../utils/response";
import { uploadToS3 } from "../../utils/s3";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event as any);
    const sourceUrl = body?.url as string;
    const folder = (body?.folder as string) || "bksda_v2/uploads";

    if (!sourceUrl || typeof sourceUrl !== "string") {
      return errorResponse("Source URL is required");
    }

    // Fetch the image
    const imageResponse = await fetch(sourceUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3
    const url = await uploadToS3(buffer, 'imported', contentType);
    const filename = url.split('/').pop() || 'unknown';

    // Attempt to guess mime type from response headers or filename
    const contentType = imageResponse.headers.get('content-type') || 'application/octet-stream';

    return successResponse("Imported successfully", {
      url: url,
      filename: filename,
      mimetype: contentType,
      width: 0,
      height: 0,
      format: contentType.split('/')[1] || '',
      resource_type: 'image',
    });
  } catch (err: any) {
    console.error("S3 remote upload error:", err);
    return errorResponse("Failed to import to S3", err.message || "");
  }
});
