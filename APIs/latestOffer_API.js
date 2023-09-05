const express = require('express');
const router = express.Router();
const LatestOffer = require('../models/latestOffer_Model.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/latestOffersImages'); 
    },
    filename: function (req, file, cb) {
        const uniqueFileName = file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });
router.post('/addLatestOffer', upload.single('latestOffer_Image'), async (req, res) => {
    try {
        const { latestOffer_Title, latestOffer_Description } = req.body;
        const latestOffer_Image = req.file ? req.file.path : null;
console.log(latestOffer_Image)
        const latestOfferData = new LatestOffer({
            latestOffer_Title,
            latestOffer_Description,
            latestOffer_Image,
        });

        // Save the instance to the database
        const result = await latestOfferData.save();

        console.log('Added latestOfferData:', result);
        res.status(200).json({ message: 'latestOfferData added successfully' });
    } catch (error) {
        console.error('Error adding latestOfferData:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




router.get('/AllLatestOffers', async (req, res) => {
    try {
      const latestOffers = await LatestOffer.find();
      res.status(200).json(latestOffers);
    } catch (error) {
      console.error('Error retrieving latestOffers:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  router.delete('/deleteLatestOffer/:id', async (req, res) => {
    try {
        const latestOfferId = req.params.id;

        // Delete the slide by ID
        const deletedLatestOffer = await LatestOffer.findByIdAndDelete(latestOfferId);

        if (!deletedLatestOffer) {
            return res.status(404).json({ message: 'LatestOffer not found' });
        }

        res.status(200).json({ message: 'LatestOffer deleted successfully', deletedLatestOffer });
    } catch (error) {
        console.error('Error deleting deletedLatestOffer:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/LatestOfferDetails/:id', async (req, res) => {
    try {
        const latestOfferId = req.params.id;

        // Find the slide by ID
        const latestOffer = await LatestOffer.findById(latestOfferId);

        if (!latestOffer) {
            return res.status(404).json({ message: 'latestOffer not found' });
        }

        res.status(200).json(latestOffer);
    } catch (error) {
        console.error('Error retrieving slide details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



  // Update a slider by its ID
  router.put('/updateLatestOffer/:id', upload.single('latestOffer_ImageUp'), async (req, res) => {
    try {
        const { latestOffer_Title, latestOffer_Description } = req.body;
        const latestOffer_Image = req.file ? req.file.path : null;
        
        const updatedData = {
            latestOffer_Title,
            latestOffer_Description,
        };

        if (latestOffer_Image) {
            updatedData.latestOffer_Image = latestOffer_Image;
        }

        const result = await LatestOffer.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'LatestOffer not found' });
        }

        console.log('LatestOffer slider:', result);
        res.status(200).json({ message: 'LatestOffer updated successfully', slider: result });
    } catch (error) {
        console.error('Error updating LatestOffer:', error);
        res.status(500).json({ error: 'Server error' });
    }
});






  module.exports = router;
