const models = require('../models');

class Table {
   createTable = async (req, res, next) => {
      try {
         const { tableName } = req.body;
         if (!tableName) {
            return res
               .status(400)
               .json({ message: 'Chưa nhập giá trị sao tôi thêm được' });
         }

         console.log(tableName);
         const table = await models.table.findOne({ tableName: tableName });

         if (table) {
            return res.status(400).json({ message: 'Bàn đã tồn tại' });
         }
         const newTable = new models.table({ tableName });
         await newTable.save();
         return res
            .status(200)
            .json({ message: 'Thêm bàn thành công', newTable });
      } catch (error) {
         next(error);
      }
   };
   // Sửa bàn theo ID
   updateTable = async (req, res, next) => {
      try {
         const { id } = req.params;
         const { tableName } = req.body;
         console.log(tableName);
         if (!tableName) {
            return res
               .status(400)
               .json({ message: 'Tên bàn không được để trống' });
         }

         const table = await models.table.findByIdAndUpdate(id, { tableName });

         if (!table) {
            return res.status(404).json({ message: 'Bàn không tồn tại' });
         }

         return res
            .status(200)
            .json({ message: 'Cập nhật bàn thành công', table });
      } catch (error) {
         next(error);
      }
   };

   // Xóa bàn theo ID
   deleteTable = async (req, res, next) => {
      try {
         const { id } = req.params;

         const table = await models.table.findByIdAndDelete(id);

         if (!table) {
            return res.status(404).json({ message: 'Bàn không tồn tại' });
         }

         return res.status(200).json({ message: 'Xóa bàn thành công' });
      } catch (error) {
         next(error);
      }
   };

   getAll = async (req, res, next) => {
      try {
         const table = await models.table.find();

         if (!table) {
            return res.status(400).json({
               message: 'chưa có bàn nào được tạo',
            });
         }

         return res.status(200).json({
            message: 'Lấy bàn thành công',
            table,
         });
      } catch (error) {
         next(error);
      }
   };

   getTablesOff = async (req, res, next) => {
      try {
         const table = await models.table.find({ status: false });

         if (!table) {
            return res.status(400).json({
               message: 'chưa có bàn nào được tạo',
            });
         }

         return res.status(200).json({
            message: 'Lấy bàn thành công',
            table,
         });
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new Table();
