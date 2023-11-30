const Reward = require('../models/reward');
const User = require('../models/user');

// Get all reward transactions
exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await Reward.find({ givenTo: req.params.id });
        res.status(200).json(rewards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};