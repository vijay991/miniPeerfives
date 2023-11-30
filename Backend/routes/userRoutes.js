const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Update a user by ID
router.put('/:userId', userController.updateUserById);

module.exports = router;
