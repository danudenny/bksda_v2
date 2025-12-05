import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = async (
    buffer: Buffer,
    folder: string = 'bksda_v2/uploads'
): Promise<any> => {
    const config = useRuntimeConfig();

    cloudinary.config({
        cloud_name: config.cloudinaryCloudName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret,
    });

    const currentYear = new Date().getFullYear();

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                transformation: [
                    {
                        color: '#FFFFFF',
                        overlay: {
                            font_family: 'Helvetica',
                            font_size: 100,
                            font_weight: 'bold',
                            text: `© BKSDA SUMSEL`,
                            text_align: 'center',
                        },
                    },
                    {
                        flags: ['layer_apply', 'relative'],
                        gravity: 'south_east',
                        opacity: 35,
                        width: '0.33',
                        crop: 'fit',
                        x: '0.02',
                        y: '0.02',
                    },
                ],
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};

export default cloudinary;
