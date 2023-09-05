// routes/menu.js

const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu_Model');







router.put('/updateMenuOrder', async (req, res) => {
    try {
      const updatedItems = req.body;
  
      for (const updatedItem of updatedItems) {
        const menuItem = await MenuItem.findById(updatedItem._id);
        if (!menuItem) {
          return res.status(404).json({ message: 'Menu item not found' });
        }
        menuItem.order = updatedItem.order;
        await menuItem.save();
      }
  
      res.json({ message: 'Menu item orders updated successfully' });
    } catch (error) {
      console.error('Error updating menu item orders:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });



// Get all menu items
router.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ order: 1 });
    res.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new menu item
router.post('/menu', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get a specific menu item by ID
router.get('/menu/:id', async (req, res) => {
    try {
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.json(menuItem);
    } catch (error) {
      console.error('Error fetching menu item:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });



// Update a menu item by ID
router.put('/menu/:id', async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(updatedMenuItem);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a menu item by ID
router.delete('/menu/:id', async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
