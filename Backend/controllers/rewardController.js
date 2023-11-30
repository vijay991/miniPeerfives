const Reward = require('../models/reward');
const User = require('../models/user');
const { ErrorHandler } = require('../middleware/errorMiddleware');

// Get all reward transactions
exports.getAllRewards = async (req, res, next) => {
    try {
        const givenToUser = await User.findById(req.params.id);
        if (!givenToUser) {
            throw new ErrorHandler({ message: 'User not found', statusCode: 404 })
        }
        const rewards = await Reward.find({ givenTo: req.params.id });
        res.status(200).json(rewards);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};
