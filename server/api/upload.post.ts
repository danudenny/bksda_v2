import { successResponse, errorResponse } from '../utils/response';
import { uploadToCloudinary } from '../utils/cloudinary';

export default defineEventHandler(async (event) => {
  // Ensure user is authenticated/admin
  // const user = useAuth(event);
  // requireAdmin(user); 
  // For now we'll skip auth check for simplicity in this step, but it should be added.

  const files = await readMultipartFormData(event);
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: errorResponse('No file uploaded')
    });
  }

  const file = files[0];
  if (!file.filename) {
     throw createError({ 
        statusCode: 400, 
        statusMessage: "Bad Request",
        data: errorResponse("Invalid file")
     });
  }

  // Basic validation
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
  if (!allowedTypes.includes(file.type || '')) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: "Bad Request", 
        data: errorResponse("Invalid file type. Only images are allowed.")
      });
  }

  try {
    const result = await uploadToCloudinary(file.data, 'bksda_v2/uploads');

    return successResponse('File uploaded successfully', {
      url: result.secure_url,
      filename: result.public_id,
      mimetype: result.format ? `image/${result.format}` : file.type,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: errorResponse('Failed to upload file to Cloudinary', error.message)
    });
  }
});
