import {v2 as cloudinary} from 'cloudinary';

const connectToCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        console.log('Successfully connected to the Cloudinary!');
    } catch (error) {
        console.error("Error connecting to the Cloudinary:", error);
    }
}

export default connectToCloudinary;
