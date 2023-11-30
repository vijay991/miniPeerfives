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

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { Name } = req.body;
        if (!Name) {
            return res.status(404).json({ error: 'Name is required' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { Name },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};