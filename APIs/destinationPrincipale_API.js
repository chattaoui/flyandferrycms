const express = require('express');
const router = express.Router();
const multer = require('multer');
const DestinationPrincipale = require('../models/destinationPrincipale_Model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/destinationImages'); // Change the destination folder accordingly
    },
    filename: function (req, file, cb) {
        const uniqueFileName = file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });

router.post('/addDestinationPrincipale', upload.fields([
    { name: 'imageVille', maxCount: 1 },
    { name: 'imagePays', maxCount: 1 }
]), async (req, res) => {
    try {
        const { nomVille, nomPays } = req.body;

        const imageVille = req.files['imageVille'] ? req.files['imageVille'][0].path : null;
        const imagePays = req.files['imagePays'] ? req.files['imagePays'][0].path : null;

        const destinationData = new DestinationPrincipale({
            nomVille,
            imageVille,
            nomPays,
            imagePays,
        });

        const result = await destinationData.save();

        console.log('Added destination principale:', result);
        res.status(200).json({ message: 'Destination principale added successfully' });
    } catch (error) {
        console.error('Error adding destination principale:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



router.get('/AllDestinationsPrincipales', async (req, res) => {
    try {
      const destinationsPrincipales = await DestinationPrincipale.find();
      res.status(200).json(destinationsPrincipales);
    } catch (error) {
      console.error('Error retrieving destinationsPrincipales:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });





  //Update an existing destination principale by ID
  router.put('/updateDestinationPrincipale/:id', upload.fields([
      { name: 'imageVille', maxCount: 1 },
      { name: 'imagePays', maxCount: 1 }
  ]), async (req, res) => {
      try {
          const { nomVille, nomPays } = req.body;
          const imageVille = req.files['imageVille'] ? req.files['imageVille'][0].path : null;
          const imagePays = req.files['imagePays'] ? req.files['imagePays'][0].path : null;
          
          // Assuming you have a MongoDB ObjectId as the id parameter
          const destinationId = req.params.id;
  
          const updatedData = {
              nomVille,
              imageVille,
              nomPays,
              imagePays,
          };
  
          // Use findByIdAndUpdate to update the existing data
          const result = await DestinationPrincipale.findByIdAndUpdate(destinationId, updatedData, { new: true });
  
          console.log('Updated destination principale:', result);
          res.status(200).json({ message: 'Destination principale updated successfully', updatedDestination: result });
      } catch (error) {
          console.error('Error updating destination principale:', error);
          res.status(500).json({ error: 'Server error' });
      }
  });




  
router.get('/destinationPrincipaleDetails/:id', async (req, res) => {
    try {
        const destinationPrincipaleId = req.params.id;

        // Find the slide by ID
        const destinationPrincipale = await DestinationPrincipale.findById(destinationPrincipaleId);

        if (!destinationPrincipale) {
            return res.status(404).json({ message: 'destinationPrincipale not found' });
        }

        res.status(200).json(destinationPrincipale);
    } catch (error) {
        console.error('Error retrieving destinationPrincipale details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




router.delete('/deleteDestinationPrincipale/:id', async (req, res) => {
    try {
        const DestinationPrincipaleId = req.params.id;

        // Delete the slide by ID
        const destinationPrincipale = await DestinationPrincipale.findByIdAndDelete(DestinationPrincipaleId);

        if (!destinationPrincipale) {
            return res.status(404).json({ message: 'DestinationPrincipale not found' });
        }

        res.status(200).json({ message: 'DestinationPrincipale deleted successfully', destinationPrincipale });
    } catch (error) {
        console.error('Error deleting DestinationPrincipale:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
