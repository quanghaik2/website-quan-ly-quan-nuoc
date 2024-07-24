const models = require('../models')

class Order{
    createOrder = async (req, res, next) => {
        try {
            const {tableId, note, status, products} = req.body;
            const order = await models.order.findById(tableId);
            if (!order) {
                throw new Error({
                    statusCode: 400,
                    message: 'table not found',
                 })
            }
            const total = products.reduce((sum, product) => {
                return sum + product.price * product.quantity;
            }, 0);
            const newProduct = models.product({
                tableId,
                note,
                products,
                status,
                total_amount: total
            });
            await newProduct.save();
            return res.status(200).json({
                message: 'order created successfully',
                newProduct
            })
        } catch (error) {
            next(error);
        }
    }
    getOrder = async (req, res, next) => {
        try {
            const id =  req.params.id
            if (!id) throw new Error('Missing required fields')
            
            const order = models.order.findById(id).exec()
            return res.status(200).json({
                message: "",
                data: order
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new Order();
