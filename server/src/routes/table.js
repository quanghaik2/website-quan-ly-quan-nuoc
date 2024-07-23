const tableController = require('../controllers/table.controller')

const router = require('express').Router()

router.get('/', tableController.getAll);
router.post('/create', tableController.createTable);

module.exports = router
