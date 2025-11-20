import prisma from "../../utils/db";
import { useAuth, requireAdmin } from "../../utils/auth";
import { successResponse, errorResponse } from "../../utils/response";
import { uploadToCloudinary } from "../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  try {
    const user = useAuth(event);
    requireAdmin(user);

    const body = await readMultipartFormData(event);
    if (!body) return errorResponse("No data provided");

    const name = body.find(item => item.name === 'name')?.data.toString() || '';
    const type = body.find(item => item.name === 'type')?.data.toString() || '';
    const location = body.find(item => item.name === 'location')?.data.toString() || '';
    const description = body.find(item => item.name === 'description')?.data.toString() || '';
    const order = body.find(item => item.name === 'order')?.data.toString();
    const isActive = body.find(item => item.name === 'isActive')?.data.toString() === 'true';
    
    const imageFile = body.find(item => item.name === 'image');
    let imageUrl = body.find(item => item.name === 'imageUrl')?.data.toString() || '';

    if (imageFile && imageFile.data && imageFile.data.length > 0) {
      try {
        const result = await uploadToCloudinary(imageFile.data, 'bksda_v2/uploads/hero-slides');
        imageUrl = result.secure_url;
      } catch (error) {
         console.error("Failed to upload hero image:", error);
         throw new Error("Failed to upload image");
      }
    }
    
    const slide = await prisma.heroSlide.create({
      data: {
        name,
        type,
        location,
        imageUrl,
        description,
        order: order ? parseInt(order) : 0,
        isActive,
      },
    });

    return successResponse("Hero slide created successfully", slide);
  } catch (error: any) {
    console.error("Create hero slide error:", error);
    return errorResponse("Failed to create hero slide", error.message);
  }
});
