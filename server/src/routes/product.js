const productController = require('../controllers/product.controller');

const router = require('express').Router();

// Route để lấy danh sách sản phẩm
router.get('/', productController.getAll);

// Route để lấy theo id sản phẩm
router.get('/getProduct', productController.getProduct);

// Route để tạo sản phẩm mới
router.post('/create', productController.createProduct);

// Route để cập nhật thông tin sản phẩm theo ID
router.put('/update/:id', productController.updateProduct);

// Route để xóa sản phẩm theo ID
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
