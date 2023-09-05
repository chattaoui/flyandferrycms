const express = require('express');
const router = express.Router();
const SEOSetting = require('../models/SEOSettings_Model.js');



router.post('/ProcessSEOSettings', async (req, res) => {
    try {
      const { Website_Title, Website_URL,Meta_Description,Meta_Keywords } = req.body;
  
      const updateData = {
        Website_Title,
        Website_URL,
        Meta_Description,
        Meta_Keywords

      };
  
      const result = await SEOSetting.findOneAndUpdate({}, updateData, {
        upsert: true,
        new: true,
      });
  
      console.log('Updated/Added SEOSettings:', result);
      res.status(200).json({ message: 'SEOSettings updated/added successfully' });
    } catch (error) {
      console.error('Error add/update SEOSettings:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });



  router.get('/SEOSettingsDetails', async (req, res) => {
    try {
      const sEOSetting = await SEOSetting.find();
      res.status(200).json(sEOSetting);
    } catch (error) {
      console.error('Error retrieving sEOSetting:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;
