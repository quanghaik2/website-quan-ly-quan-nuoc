const tableController = require('../controllers/table.controller')

const router = require('express').Router()

router.post('/create', tableController.createTable);

module.exports = router
