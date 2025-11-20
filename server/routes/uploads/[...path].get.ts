import fs from 'node:fs';
import path from 'node:path';
import { sendStream } from 'h3';

export default defineEventHandler(async (event) => {
  const params = event.context.params;
  if (!params || !params.path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  const filePathParam = params.path;
  // Security: Prevent directory traversal
  if (filePathParam.includes('..')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }

  // Use the same path logic as upload.post.ts
  const publicDir = path.resolve(process.cwd(), 'public/uploads');
  const filePath = path.join(publicDir, filePathParam);

  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found',
    });
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile()) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found',
    });
  }

  // Set Content-Type header
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.avif': 'image/avif',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  if (mimeTypes[ext]) {
    setResponseHeader(event, 'Content-Type', mimeTypes[ext]);
  }
  
  return sendStream(event, fs.createReadStream(filePath));
});
