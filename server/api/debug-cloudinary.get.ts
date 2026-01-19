
import { uploadToCloudinary } from "../utils/cloudinary";

export default defineEventHandler(async (event) => {
    try {
        // Create a simple 1x1 pixel base64 image (dot)
        const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
        const buffer = Buffer.from(base64Image, 'base64');

        console.log('Triggering debug upload...');
        const result = await uploadToCloudinary(buffer, 'bksda_v2/debug');
        return { success: true, url: result.secure_url };
    } catch (error: any) {
        console.error('Debug upload failed:', error);
        return { success: false, error: error.message, stack: error.stack };
    }
});
