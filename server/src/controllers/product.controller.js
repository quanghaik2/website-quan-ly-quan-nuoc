const models = require('../models')

class Product {
    createProduct = async (req, res, next) => {
        try {
            const {productName, category, status, price, image} =req.body
            const product = await models.product.findOne({productName});
            console.log(req.body)
            if(product) {
                return res.status(400).json({
                    message: 'Sản phẩm đã tồn tại',
                })
            }
            const newProduct = new models.product(req.body);
            await newProduct.save();
            return res.status(200).json({
                message: 'Product created successfully',
                newProduct
            })
        } catch (error) {
            next(error);
        }
    };
    getAll = async (req, res, next) => {
        try {
            
            const product = await models.product.find();
            
            if(product) {
                return res.status(400).json({
                    message: 'chưa có sản phẩm nào được tạo',
                })
            }
            
            return res.status(200).json({
                message: 'Lấy sản phẩm thành công',
                product
            })
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new Product();
