const express = require('express');
const router = express.Router();
const ApiSettings = require('../models/ApiSettings_Model.js');

// Endpoint pour mettre à jour ou ajouter les paramètres d'API
router.post('/ProcessApiSettings', async (req, res) => {
    try {
      const { agentAccountNumber, password, countryCode, currency } = req.body;
  
      const updateData = {
        agentAccountNumber,
        password,
        countryCode,
        currency,
      };
  
      const result = await ApiSettings.findOneAndUpdate({}, updateData, {
        upsert: true,
        new: true,
      });
  
      console.log('Updated/Added API Settings:', result);
      res.status(200).json({ message: 'API Settings updated/added successfully' });
    } catch (error) {
      console.error('Error add/update API Settings:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint pour obtenir les détails des paramètres d'API
router.get('/ApiSettingsDetails', async (req, res) => {
    try {
      const apiSettings = await ApiSettings.find();
      res.status(200).json(apiSettings);
    } catch (error) {
      console.error('Error retrieving API Settings:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
