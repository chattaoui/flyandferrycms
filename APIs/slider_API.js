const express = require('express');
const router = express.Router();
const Slider = require('../models/slider_Model.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/sliderImages'); 
    },
    filename: function (req, file, cb) {
        const uniqueFileName = file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });
router.post('/addSlider', upload.single('Slider_Image'), async (req, res) => {
    try {
        const { Slider_Title, Slider_Description } = req.body;
        const Slider_Image = req.file ? req.file.path : null;
console.log(Slider_Image)
        const sliderData = new Slider({
            Slider_Title,
            Slider_Description,
            Slider_Image,
        });

        // Save the instance to the database
        const result = await sliderData.save();

        console.log('Added slider:', result);
        res.status(200).json({ message: 'slider added successfully' });
    } catch (error) {
        console.error('Error adding slider:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



router.get('/AllSlides', async (req, res) => {
    try {
      const slides = await Slider.find();
      res.status(200).json(slides);
    } catch (error) {
      console.error('Error retrieving slides:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  // Update a slider by its ID
router.put('/updateSlider/:id', upload.single('Slider_Image'), async (req, res) => {
    try {
        const { Slider_Title, Slider_Description } = req.body;
        const Slider_Image = req.file ? req.file.path : null;
        
        const updatedData = {
            Slider_Title,
            Slider_Description,
        };

        if (Slider_Image) {
            updatedData.Slider_Image = Slider_Image;
        }

        const result = await Slider.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        console.log('Updated slider:', result);
        res.status(200).json({ message: 'Slider updated successfully', slider: result });
    } catch (error) {
        console.error('Error updating slider:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/slideDetails/:id', async (req, res) => {
    try {
        const slideId = req.params.id;

        // Find the slide by ID
        const slide = await Slider.findById(slideId);

        if (!slide) {
            return res.status(404).json({ message: 'Slide not found' });
        }

        res.status(200).json(slide);
    } catch (error) {
        console.error('Error retrieving slide details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.delete('/deleteSlide/:id', async (req, res) => {
    try {
        const slideId = req.params.id;

        // Delete the slide by ID
        const deletedSlide = await Slider.findByIdAndDelete(slideId);

        if (!deletedSlide) {
            return res.status(404).json({ message: 'Slide not found' });
        }

        res.status(200).json({ message: 'Slide deleted successfully', deletedSlide });
    } catch (error) {
        console.error('Error deleting slide:', error);
        res.status(500).json({ error: 'Server error' });
    }
});





module.exports = router;
