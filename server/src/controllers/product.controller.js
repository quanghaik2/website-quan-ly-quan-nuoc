const models = require('../models');

class Product {
   createProduct = async (req, res, next) => {
      try {
         const { productName, category, status, price, image } = req.body;
         const product = await models.product.findOne({ productName });
         console.log(req.body);
         if (product) {
            return res.status(400).json({
               message: 'Sản phẩm đã tồn tại',
            });
         }
         const newProduct = new models.product(req.body);
         await newProduct.save();
         return res.status(200).json({
            message: 'Product created successfully',
            newProduct,
         });
      } catch (error) {
         next(error);
      }
   };
   updateProduct = async (req, res, next) => {
      try {
         const { id } = req.params;
         const { productName, price, category, image } = req.body;

         if (!productName || !price || !category || !image) {
            return res
               .status(400)
               .json({ message: 'Chưa nhập đầy đủ thông tin sản phẩm' });
         }

         const updatedProduct = await models.product.findByIdAndUpdate(
            id,
            { productName, price, category, image },
            { new: true }
         );

         if (!updatedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
         }

         return res
            .status(200)
            .json({ message: 'Cập nhật sản phẩm thành công', updatedProduct });
      } catch (error) {
         next(error);
      }
   };

   deleteProduct = async (req, res, next) => {
      try {
         const { id } = req.params;
         const deletedProduct = await models.product.findByIdAndDelete(id);

         if (!deletedProduct) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
         }

         return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
      } catch (error) {
         next(error);
      }
   };

   getAll = async (req, res, next) => {
      try {
         const product = await models.product.find();

         if (!product) {
            return res.status(400).json({
               message: 'chưa có sản phẩm nào được tạo',
            });
         }

         return res.status(200).json({
            message: 'Lấy sản phẩm thành công',
            product,
         });
      } catch (error) {
         next(error);
      }
   };

   getProduct = async (req, res, next) => {
      try {
         const product = await models.product.findById(req.query.id);

         if (!product) {
            return res.status(400).json({
               message: 'chưa có sản phẩm này hoặc đã bị xóa',
            });
         }

         return res.status(200).json({
            message: 'Lấy sản phẩm thành công',
            product,
         });
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new Product();
