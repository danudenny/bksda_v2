import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { successResponse, errorResponse } from '../utils/response';

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

  const fileName = `${randomUUID()}.avif`;
  
  // Resolve path relative to project root
  const publicDir = path.resolve(process.cwd(), 'public/uploads');
  const filePath = path.join(publicDir, fileName);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Convert to AVIF using sharp
  await sharp(file.data)
    .avif({ quality: 80 }) // Adjust quality as needed
    .toFile(filePath);

  return successResponse('File uploaded successfully', {
    url: `/uploads/${fileName}`,
    filename: fileName,
    mimetype: 'image/avif',
    // size: fs.statSync(filePath).size // Optional: get actual size of the converted file
  });
});
