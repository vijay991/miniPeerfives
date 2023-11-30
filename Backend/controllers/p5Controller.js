const Reward = require('../models/reward');
const User = require('../models/user');
const { ErrorHandler } = require('../middleware/errorMiddleware');

// Create a new P5 transaction
exports.createP5 = async (req, res, next) => {
    try {
        const { points, givenTo } = req.body;

        if (!points || !givenTo) {
            return new ErrorHandler({ message: 'points and givenTo are required', statusCode: 400 });
        }

        const givenByUser = await User.findById(req.params.id);
        if (!givenByUser) {
            throw new ErrorHandler({ message: 'givenBy user not found', statusCode: 404 });
        }

        if (givenByUser.P5Balance < points) {
            throw new ErrorHandler({ message: 'Insufficient P5 balance', statusCode: 400 });
        }

        if (parseInt(points) > 100) {
            throw new ErrorHandler({ message: 'User can not reward more than 100 P5', statusCode: 400 });
        }

        if (givenByUser.Name === givenTo) {
            throw new ErrorHandler({ message: 'Cannot give P5 points to yourself', statusCode: 400 });
        }

        givenByUser.P5Balance -= points;
        await givenByUser.save();

        const givenToUser = await User.findOne({ Name: givenTo });
        if (!givenToUser) {
            throw new ErrorHandler({ message: 'Recipient user not found', statusCode: 404 });
        }

        givenToUser.RewardBalance += points;
        await givenToUser.save();

        const newP5 = new Reward({ points, givenByName: givenByUser.Name, givenToName: givenToUser.Name, givenBy: givenByUser.id, givenTo: givenToUser.id });
        await newP5.save();

        res.status(201).json(newP5);
    } catch (error) {
        next(new ErrorHandler(error))
    }
};

// Get all P5 transactions
exports.getAllP5 = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const p5Transactions = await Reward.find({ givenBy: userId });
        res.status(200).json(p5Transactions);
    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error))
    }
};

// Delete a P5 transaction by ID
exports.deleteP5ById = async (req, res, next) => {
    try {

        const givenByUser = await User.findById(req.params.id);
        if (!givenByUser) {
            throw new ErrorHandler({ message: 'User who initiated the transaction not found', statusCode: 404 });
        }

        const deletedP5 = await Reward.findByIdAndDelete(req.params.p5Id);
        if (!deletedP5) {
            throw new ErrorHandler({ message: 'P5 transaction not found', statusCode: 404 });
        }

        const { points, givenBy, givenTo } = deletedP5;


        givenByUser.P5Balance += points;
        await givenByUser.save();

        const givenToUser = await User.findById(givenTo);
        if (givenToUser) {
            givenToUser.RewardBalance -= points;
            await givenToUser.save();
        }

        res.status(200).json(deletedP5);
    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error))
    }
};
