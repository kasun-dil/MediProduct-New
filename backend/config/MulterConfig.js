import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './CloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'MediProduct', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Accepted formats
  },
});

const upload = multer({ storage });

export default upload;
