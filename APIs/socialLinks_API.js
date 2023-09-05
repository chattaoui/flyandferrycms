const express = require('express');
const router = express.Router();
const SocialLinks = require('../models/socialLinks_Model.js');

// Create or update social links
router.post('/ProcessSocialLinks', async (req, res) => {
  try {
    const {
      facebook,
      instagram,
      snapchat,
      whatsapp,
      pinterest,
      youtube,
      linkedin
    } = req.body;

    const updateData = {
      facebook,
      instagram,
      snapchat,
      whatsapp,
      pinterest,
      youtube,
      linkedin
    };

    const result = await SocialLinks.findOneAndUpdate({}, updateData, {
      upsert: true,
      new: true,
    });

    console.log('Updated/Added social links:', result);
    res.status(200).json({ message: 'Social links updated/added successfully' });
  } catch (error) {
    console.error('Error add/update social links:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get social links details
router.get('/SocialLinksDetails', async (req, res) => {
  try {
    const socialLinks = await SocialLinks.find();
    res.status(200).json(socialLinks);
  } catch (error) {
    console.error('Error retrieving social links:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
