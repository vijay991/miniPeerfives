const User = require('../models/user');
const { ErrorHandler } = require('../middleware/errorMiddleware');

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { Name } = req.body;
        if (!Name) {
            throw new ErrorHandler({ message: 'Name is required', statusCode: 400 });
        }
        const newUser = new User({ Name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new ErrorHandler({ message: 'User not found', statusCode: 404 });
        }
        res.status(200).json(user);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
    try {
        const { Name } = req.body;

        if (!Name || !Name.trim()) {
            throw new ErrorHandler({ message: 'Name is required and must not be empty', statusCode: 400 });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            throw new ErrorHandler({ message: 'User not found', statusCode: 404 });
        }

        user.Name = Name;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};
