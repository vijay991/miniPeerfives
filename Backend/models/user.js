const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    P5Balance: { type: Number, default: 5000 },
    RewardBalance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
