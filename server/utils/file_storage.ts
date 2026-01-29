import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const uploadToLocal = async (
    buffer: Buffer,
    folder: string = 'posts'
): Promise<string> => {
    // Determine the upload directory
    const uploadDir = path.join(process.cwd(), 'uploads', folder);

    // Ensure directory exists
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    // Generate a unique filename
    const filename = `${Date.now()}-${uuidv4()}.jpg`; // Assuming JPEG for simplicity, or we could detect mime type if needed
    const filePath = path.join(uploadDir, filename);

    // Write file
    await fs.writeFile(filePath, buffer);

    // Return the public URL
    // Note: /uploads/... matches the public directory structure served by Nuxt/Nitro
    return `/uploads/${folder}/${filename}`;
};
