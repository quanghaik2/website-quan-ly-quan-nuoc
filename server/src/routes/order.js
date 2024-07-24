const orderController = require('../controllers/order.controller')

const router = require('express').Router()

router.post('/create', orderController.createOrder)
router.put('/update/:id', orderController.updateOrder)
router.get('/statics', orderController.getOrdersByDate)
router.get('/:id', orderController.getOrder)
router.get('/', orderController.getOrders)

module.exports = router
