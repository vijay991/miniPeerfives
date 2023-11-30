const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

//Get all users
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
// Update a user by ID
router.put('/:id', userController.updateUserById);

module.exports = router;
