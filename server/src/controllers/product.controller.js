const models = require('../models')

class Product {
    createProduct = async (req, res, next) => {
        try {
            const {productName, category, status, price, image} =req.body
            const product = await models.product.findOne({productName});
            if(product) {
                throw new Error({
                    statusCode: 400,
                    message: 'product already exists',
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
}

module.exports = new Product();
