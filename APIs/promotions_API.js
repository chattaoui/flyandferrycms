const express = require('express');
const router = express.Router();
const Promotion = require('../models/promotion_Model.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/promotionsImages'); 
    },
    filename: function (req, file, cb) {
        const uniqueFileName = file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });
router.post('/addPromotion', upload.single('promotion_Image'), async (req, res) => {
    try {
        const { promotion_Title, promotion_Description } = req.body;
        const promotion_Image = req.file ? req.file.path : null;
console.log(promotion_Image)
        const promotionData = new Promotion({
            promotion_Title,
            promotion_Description,
            promotion_Image,
        });

        const result = await promotionData.save();

        console.log('Added promotionData:', result);
        res.status(200).json({ message: 'promotionData added successfully' });
    } catch (error) {
        console.error('Error adding promotionData:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



router.get('/AllPromotions', async (req, res) => {
    try {
      const promotions = await Promotion.find();
      res.status(200).json(promotions);
    } catch (error) {
      console.error('Error retrieving promotions:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });









  router.delete('/deletePromotion/:id', async (req, res) => {
    try {
        const latestOfferId = req.params.id;

        // Delete the slide by ID
        const deletedPromotion = await Promotion.findByIdAndDelete(latestOfferId);

        if (!deletedPromotion) {
            return res.status(404).json({ message: 'deletedPromotion not found' });
        }

        res.status(200).json({ message: 'deletedPromotion deleted successfully', deletedPromotion });
    } catch (error) {
        console.error('Error deleting deletedPromotion:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




router.get('/promotionDetails/:id', async (req, res) => {
    try {
        const promotionId = req.params.id;

        // Find the slide by ID
        const promotion = await Promotion.findById(promotionId);

        if (!promotion) {
            return res.status(404).json({ message: 'promotion not found' });
        }

        res.status(200).json(promotion);
    } catch (error) {
        console.error('Error retrieving promotion details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});






  // Update a slider by its ID
  router.put('/updatePromotion/:id', upload.single('promotion_Image'), async (req, res) => {
    try {
        const { promotion_Title, promotion_Description } = req.body;
        const promotion_Image = req.file ? req.file.path : null;
        
        const updatedData = {
            promotion_Title,
            promotion_Description,
        };

        if (promotion_Image) {
            updatedData.promotion_Image = promotion_Image;
        }

        const result = await Promotion.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Promotion not found' });
        }

        console.log('Promotion Promotion:', result);
        res.status(200).json({ message: 'Promotion updated successfully', slider: result });
    } catch (error) {
        console.error('Error updating Promotion:', error);
        res.status(500).json({ error: 'Server error' });
    }
});






module.exports = router;
