import { successResponse, errorResponse } from "../../utils/response";
import cloudinary from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as any;
    const folder = query.folder || "bksda_v2/uploads";
    const q = (query.q as string) || "";
    const max = Math.min(100, parseInt(query.limit as string) || 50);
    const nextCursor = (query.nextCursor as string) || undefined;

    // Ensure Cloudinary is configured
    const config = useRuntimeConfig();
    cloudinary.config({
      cloud_name: config.cloudinaryCloudName,
      api_key: config.cloudinaryApiKey,
      api_secret: config.cloudinaryApiSecret,
    });

    let expression = `folder=${folder}`;
    if (q) {
      expression += ` AND (filename:${q} OR public_id:${q})`;
    }

    // @ts-ignore
    const result = await (cloudinary as any).search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(max)
      .next_cursor(nextCursor)
      .execute();

    const assets = (result.resources || []).map((r: any) => ({
      public_id: r.public_id,
      url: r.secure_url || r.url,
      width: r.width,
      height: r.height,
      format: r.format,
      bytes: r.bytes,
      created_at: r.created_at,
      folder: r.folder,
      filename: r.filename,
    }));

    return successResponse("Assets retrieved", {
      assets,
      nextCursor: result.next_cursor || null,
      totalCount: result.total_count || assets.length,
    });
  } catch (err: any) {
    console.error("Cloudinary list assets error:", err);
    return errorResponse("Failed to retrieve assets", err.message || "");
  }
});
