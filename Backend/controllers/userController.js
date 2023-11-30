const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) {
            return res.status(404).json({ error: 'Name is required' });
        }
        const newUser = new User({ Name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { Name } = req.body;

        // Validation: Check if Name exists and is not an empty string
        if (!Name || !Name.trim()) {
            return res.status(400).json({ error: 'Name is required and must not be empty' });
        }

        // Find the user by ID
        const user = await User.findById(req.params.id);

        // Check if the user was not found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user properties
        user.Name = Name;

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};