import { successResponse, errorResponse } from '../utils/response';
import { uploadToLocal } from '../utils/file_storage';

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
    const url = await uploadToLocal(file.data, 'uploads');
    const filename = url.split('/').pop() || file.filename || 'unknown';

    return successResponse('File uploaded successfully', {
      url: url,
      filename: filename,
      mimetype: file.type,
      width: 0, // Not available without processing
      height: 0, // Not available without processing
      format: file.type?.split('/')[1] || '',
      resource_type: 'image'
    });
  } catch (error: any) {
    console.error("Local upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: errorResponse('Failed to upload file locally', error.message)
    });
  }
});
