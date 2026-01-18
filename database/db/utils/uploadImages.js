const cloudinary = require('../config/cloudinary');

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} fileBuffer - Image file buffer from multer
 * @param {String} folder - Cloudinary folder name (e.g., 'projects', 'users')
 * @returns {Promise<String>} - Cloudinary image URL
 */
async function uploadToCloudinary(fileBuffer, folder = 'uploads') {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(fileBuffer);
  });
}

module.exports = { uploadToCloudinary };