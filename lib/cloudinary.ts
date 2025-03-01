import { v2 as cloudinary } from 'cloudinary';

// Debug environment variables
console.log('Cloudinary Environment Variables:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'not set',
  api_key: process.env.CLOUDINARY_API_KEY || 'not set',
  api_secret: process.env.CLOUDINARY_API_SECRET ? '***' : 'not set'
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary environment variables are not properly configured');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
