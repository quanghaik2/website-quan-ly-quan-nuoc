const productController = require('../controllers/product.controller')

const router = require('express').Router()

router.get('/',productController.getAll);
router.post('/create', productController.createProduct);

module.exports = router