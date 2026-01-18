const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadToCloudinary } = require('../utils/uploadImage');
const Project = require('../models/Project');
const User = require('../models/User');

const MaxNbImages = 5;

// Upload project image
router.post('/project-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(req.file.buffer, 'projects');

    // Create project with image URL
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      topic: req.body.topic,
      image: imageUrl,  // ← Cloudinary URL
      creator: req.body.userId
    });

    res.json({
      success: true,
      imageUrl: imageUrl,
      project: project
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upload multiple project images
router.post('/project-image', upload.array('images', MaxNbImages), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Upload all images to Cloudinary
    const imageUrls = await Promise.all(
      req.files.map(file =>
        uploadToCloudinary(file.buffer, 'projects')
      )
    );

    // Create project with image URLs
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      topic: req.body.topic,
      images: imageUrls,   // 👈 array of Cloudinary URLs
      creator: req.body.userId
    });

    res.json({
      success: true,
      imageUrls,
      project
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upload user avatar
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const avatarUrl = await uploadToCloudinary(req.file.buffer, 'avatars');

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { 'profile.avatar': avatarUrl },
      { new: true }
    );

    res.json({
      success: true,
      avatarUrl: avatarUrl,
      user: user
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update existing project image
router.put('/project-image/:projectId', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, 'projects');

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { image: imageUrl },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      imageUrl: imageUrl,
      project: project
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;