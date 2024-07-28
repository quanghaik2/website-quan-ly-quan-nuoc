const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router.post('/statistics/monthly', statisticsController.getMonthlyStatistics);
router.post('/statistics/daily', statisticsController.getDailyStatistics);

module.exports = router;
