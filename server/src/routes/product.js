const productController = require('../controllers/product.controller')

const router = require('express').Router()

router.post('/create', productController.createProduct);

module.exports = router