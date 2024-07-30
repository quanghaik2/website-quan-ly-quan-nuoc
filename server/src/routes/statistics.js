const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router.post('/monthly', statisticsController.getMonthlyStatistics);
router.post('/daily', statisticsController.getDailyStatistics);

module.exports = router;
