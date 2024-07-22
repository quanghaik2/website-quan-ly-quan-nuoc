const models = require('../models')

class Order{
    createOrder = async (req, res, next) => {
        try {
            const {tableId, note, status} = req.body;
            
        } catch (error) {
            next(error);
        }
    }
}
