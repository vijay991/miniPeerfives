const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

//Get all users
router.get('/', userController.getAllUsers)

// Update a user by ID
router.put('/:userId', userController.updateUserById);

module.exports = router;
