import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const uploadToS3 = async (
    buffer: Buffer,
    folder: string = 'posts',
    mimeType: string = 'image/jpeg'
): Promise<string> => {
    const config = useRuntimeConfig();

    if (!config.s3AccessKeyId || !config.s3SecretAccessKey || !config.s3Endpoint || !config.s3Bucket) {
        throw new Error('S3 configuration is missing. Please check your .env file.');
    }

    const s3Client = new S3Client({
        region: 'us-east-1', // Default region, often ignored by custom endpoints but required by SDK
        endpoint: config.s3Endpoint, // Ensure this is a valid URL, e.g., https://nos.wjv-1.neo.id
        credentials: {
            accessKeyId: config.s3AccessKeyId,
            secretAccessKey: config.s3SecretAccessKey,
        },
    });

    const filename = `${uuidv4()}.jpg`; // You might want to preserve extension
    const key = `uploads/${folder}/${filename}`;

    const command = new PutObjectCommand({
        Bucket: config.s3Bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
        // ACL: 'public-read', // R2 does not support ACLs via S3 API in the same way, rely on bucket public access
    });

    await s3Client.send(command);

    // Construct the public URL
    // Assuming the endpoint + bucket path structure or a direct bucket URL
    // For Neo/MinIO/S3-compat, it's often endpoint/bucket/key or bucket.endpoint/key
    // Based on "https://nos.wjv-1.neo.id", we assume path style: https://nos.wjv-1.neo.id/bucket-name/key

    // Clean up endpoint to remove trailing slash if present
    // Use public URL if configured (Recommended for R2)
    if (config.s3PublicUrl) {
        const publicUrl = config.s3PublicUrl.replace(/\/$/, '');
        return `${publicUrl}/${key}`;
    }

    // Fallback: Clean up endpoint to remove trailing slash if present
    const endpoint = config.s3Endpoint.replace(/\/$/, '');
    return `${endpoint}/${config.s3Bucket}/${key}`;
};
