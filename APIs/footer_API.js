
var express = require('express');
var router = express.Router();
const Footer = require('../models/footer_Model.js');




router.get('/FooterInfo', async (req, res) => {
  try {
    const abouts = await Footer.find();
    res.status(200).json(abouts);
  } catch (error) {
    console.error('Error retrieving Footer Info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/ProcessFooter', async (req, res) => {
    try {
      const { FooterText, CopyrightText } = req.body;
  
      const updateData = {
        FooterText,
        
        CopyrightText
      };
  
      const result = await Footer.findOneAndUpdate({}, updateData);
  
      console.log('Updated/Added Footer:', result);
      res.status(200).json({ message: 'footer updated/added successfully' });
    } catch (error) {
      console.error('Error add/update footer:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  module.exports = router;
