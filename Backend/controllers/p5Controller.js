const Reward = require('../models/reward');
const User = require('../models/user');

// Create a new P5 transaction
exports.createP5 = async (req, res) => {
    try {
        const { points, givenTo } = req.body;

        if (!points || !givenTo) {
            return res.status(400).json({ error: 'points and givenTo are required' });
        }

        // Check if the user has sufficient P5 balance
        const givenByUser = await User.findById(req.params.id);
        if (!givenByUser) {
            return res.status(400).json({ error: 'givenBy user not found' });
        }
        if (givenByUser.P5Balance < points) {
            return res.status(400).json({ error: 'Insufficient P5 balance' });
        }
        if (parseInt(points) > 100) {
            return res.status(400).json({ error: 'User can not reward more than 100 P5' });
        }

        // Check if the user is trying to give P5 to themselves
        if (givenByUser.Name === givenTo) {
            return res.status(400).json({ error: 'Cannot give P5 points to yourself' });
        }

        // Deduct P5 from the user
        givenByUser.P5Balance -= points;
        await givenByUser.save();

        // Add P5 to the recipient
        const givenToUser = await User.findOne({ Name: givenTo });
        if (!givenToUser) {
            return res.status(404).json({ error: 'Recipient user not found' });
        }
        givenToUser.RewardBalance += points;
        await givenToUser.save();

        // Create the P5 transaction
        const newP5 = new Reward({ points, givenByName: givenByUser.Name, givenToName: givenToUser.Name, givenBy: givenByUser.id, givenTo: givenToUser.id });
        await newP5.save();

        res.status(201).json(newP5);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all P5 transactions
exports.getAllP5 = async (req, res) => {
    try {
        const userId = req.params.id;

        const p5Transactions = await Reward.find({ givenBy: userId });
        res.status(200).json(p5Transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a P5 transaction by ID
exports.deleteP5ById = async (req, res) => {
    try {
        const deletedP5 = await Reward.findByIdAndDelete(req.params.p5Id);
        if (!deletedP5) {
            return res.status(404).json({ error: 'P5 transaction not found' });
        }

        // Retrieve information about the deleted P5 transaction
        const { points, givenBy, givenTo } = deletedP5;

        // Add back the deducted P5 points to the user who initiated the transaction
        const givenByUser = await User.findOne({ Name: givenBy });
        if (!givenByUser) {
            return res.status(404).json({ error: 'User who initiated the transaction not found' });
        }
        givenByUser.P5Balance += points;
        await givenByUser.save();

        const givenToUser = await User.findOne({ Name: givenTo });
        givenToUser.RewardBalance -= points;
        await givenToUser.save();

        res.status(200).json(deletedP5);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

