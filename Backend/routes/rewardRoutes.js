const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

// Get all reward transactions
router.get('/:id/rewards', rewardController.getAllRewards);

module.exports = router;
