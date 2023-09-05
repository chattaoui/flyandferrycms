
var express = require('express');
var router = express.Router();
const About = require('../models/about_Model.js');
const AboutOption = require('../models/aboutOption_Model.js');


const multer = require('multer');

router.post('/addAboutOption', async (req, res) => {
  try {
    const { contenuInput, typeInput } = req.body;

    const aboutOption = new AboutOption({
      contenuInput,
      typeInput,
    });

    await aboutOption.save();

    console.log('New aboutOption added:', aboutOption);

    res.status(200).json({ message: 'Added about option successfully' });
  } catch (error) {
    console.error('Error adding about:', error);
    res.status(500).json({ error: 'Server error' });
  }
});






router.get('/AllAboutOptions', async (req, res) => {
  try {
    const aboutOptinos = await AboutOption.find();
    res.status(200).json(aboutOptinos);
  } catch (error) {
    console.error('Error retrieving aboutOptinos:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/updateAboutOption/:id', async (req, res) => {
  try {
    const { contenuInput, typeInput } = req.body;
    const { id } = req.params;

    // Find the AboutOption by ID and update its properties
    const updatedAboutOption = await AboutOption.findByIdAndUpdate(
      id,
      { contenuInput, typeInput },
      { new: true }
    );

    if (!updatedAboutOption) {
      return res.status(404).json({ error: 'About option not found' });
    }

    console.log('Updated about option:', updatedAboutOption);

    res.status(200).json({ message: 'About option updated successfully', data: updatedAboutOption });
  } catch (error) {
    console.error('Error updating about option:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/getAboutOptionDetails/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the AboutOption by ID
    const aboutOption = await AboutOption.findById(id);

    if (!aboutOption) {
      return res.status(404).json({ error: 'About option not found' });
    }

    console.log('About option details:', aboutOption);

    res.status(200).json({ data: aboutOption });
  } catch (error) {
    console.error('Error getting about option details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.delete('/deleteAboutOption/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find and remove the AboutOption by ID
    const deletedAboutOption = await AboutOption.findByIdAndRemove(id);

    if (!deletedAboutOption) {
      return res.status(404).json({ error: 'About option not found' });
    }

    console.log('Deleted about option:', deletedAboutOption);

    res.status(200).json({ message: 'About option deleted successfully' });
  } catch (error) {
    console.error('Error deleting about option:', error);
    res.status(500).json({ error: 'Server error' });
  }
});







  router.get('/AllAbout', async (req, res) => {
    try {
      const abouts = await About.find();
      res.status(200).json(abouts);
    } catch (error) {
      console.error('Error retrieving abouts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/AboutImageFolder'); 
    },
    filename: function (req, file, cb) {
      console.log("---------------",file.originalname)
      const uniqueFileName = 'loginImage.jpg';
      cb(null, uniqueFileName);
    },
  });
  


const upload = multer({ storage: storage });
router.post('/ProcessAbout', upload.single('About_Image'), async (req, res) => {
    try {
      const { About_Title, About_Description } = req.body;
      const About_Image = req.file ? req.file.path : null;
      console.log(About_Image)
  
      const updateData = {
        About_Title,
        About_Description,
        About_Image,
      };
  
      const result = await About.findOneAndUpdate({}, updateData, {
        upsert: true,
        new: true,
      });
  
      console.log('Updated/Added about:', result);
      res.status(200).json({ message: 'about updated/added successfully' });
    } catch (error) {
      console.error('Error add/update about:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  

  router.get('/AboutInfo', async (req, res) => {
    try {
      const abouts = await About.find();
      res.status(200).json(abouts);
    } catch (error) {
      console.error('Error retrieving abouts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  module.exports = router;