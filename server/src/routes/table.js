const tableController = require('../controllers/table.controller');
const router = require('express').Router();

// Route để lấy tất cả bàn
router.get('/', tableController.getAll);
router.get('/getTablesOff', tableController.getTablesOff);

// Route để tạo bàn mới
router.post('/create', tableController.createTable);

// Route để sửa thông tin bàn theo ID
router.put('/update/:id', tableController.updateTable);

// Route để xóa bàn theo ID
router.delete('/delete/:id', tableController.deleteTable);

module.exports = router;
