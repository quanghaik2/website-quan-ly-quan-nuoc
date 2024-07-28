const orderController = require('../controllers/order.controller')

const router = require('express').Router()

router.post('/create', orderController.createOrder)
router.put('/update/:id', orderController.updateOrder)
router.post('/statics', orderController.getOrdersByDate)
router.get('/:id', orderController.getOrder)
router.get('/', orderController.getOrders)
router.get('/getOrdersToday', orderController.getOrdersToday);
router.delete('/:id', orderController.deleteOrder);


module.exports = router
