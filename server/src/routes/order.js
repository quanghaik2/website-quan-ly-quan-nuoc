const orderController = require('../controllers/order.controller')

const router = require('express').Router()

router.post('/create', orderController.createOrder);

module.exports = router