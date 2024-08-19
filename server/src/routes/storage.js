const storageController = require('../controllers/storage.controller');

const router = require('express').Router();

router.get('/statistic', storageController.getStatisticStorage);
router.post('/', storageController.createStatisticStorage);
router.get('/', storageController.getStorageList);

module.exports = router;
