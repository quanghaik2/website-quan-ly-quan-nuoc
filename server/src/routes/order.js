const orderController = require('../controllers/order.controller')

const router = require('express').Router()

router.post('/create', orderController.login);

module.exports = router