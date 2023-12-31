const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    datetimeStamp: { type: Date, default: Date.now },
    points: { type: Number, required: true },
    givenBy: { type: String, required: true },
    givenTo: { type: String, required: true },
});

module.exports = mongoose.model('Reward', rewardSchema);
