const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Storage config (image is saved temporarily)
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  const { caption } = req.body;
  const imagePath = req.file?.path;

  if (!imagePath) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    // You must host the image somewhere publicly accessible
    // Here's a placeholder URL — replace with your image CDN or server-hosted URL
    const publicImageUrl = `https://yourdomain.com/uploads/${req.file.filename}`;

    /** ---------- FACEBOOK POST ---------- */
    const fbResponse = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PAGE_ID}/photos`,
      {
        url: publicImageUrl,
        caption,
        access_token: process.env.PAGE_ACCESS_TOKEN,
      }
    );

    /** ---------- INSTAGRAM POST (2 Steps) ---------- */

    // Step 1: Create media container
    const igMedia = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ID}/media`,
      null,
      {
        params: {
          image_url: publicImageUrl,
          caption,
          access_token: process.env.PAGE_ACCESS_TOKEN,
        },
      }
    );

    // Step 2: Publish media
    const igPublish = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.INSTAGRAM_ID}/media_publish`,
      null,
      {
        params: {
          creation_id: igMedia.data.id,
          access_token: process.env.PAGE_ACCESS_TOKEN,
        },
      }
    );

    res.json({
      message: 'Post successfully published!',
      facebook: fbResponse.data,
      instagram: igPublish.data,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to publish post', error: err.message });
  } finally {
    // Optional: Delete image from local storage
    if (imagePath) fs.unlink(imagePath, () => {});
  }
});

module.exports = router;
