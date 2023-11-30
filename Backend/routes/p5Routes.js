const express = require('express');
const router = express.Router();
const p5Controller = require('../controllers/p5Controller');

// Create a new P5 transaction
router.post('/:id/p5', p5Controller.createP5);

// Get all P5 transactions
router.get('/:id/p5', p5Controller.getAllP5);

// Delete a P5 transaction by ID
router.delete('/:id/p5/:p5Id', p5Controller.deleteP5ById);

module.exports = router;
