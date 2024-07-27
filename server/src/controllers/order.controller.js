const models = require('../models')

class Order {
   createOrder = async (req, res, next) => {
      try {
         const { tableId, note, status, products } = req.body
         const order = await models.order.findById(tableId)
         if (order) {
            throw new Error({
               statusCode: 400,
               message: 'Pls update order',
            })
         }
         const total = products.reduce((sum, product) => {
            return sum + product.price * product.quantity
         }, 0)
         const newOrder = models.order({
            tableId,
            note,
            products,
            status,
            total_amount: total,
         })
         await newOrder.save()
         if(newOrder) {
            await models.table.findByIdAndUpdate(tableId, {status: true})
         }
         return res.status(200).json({
            message: 'order created successfully',
            newOrder,
         })
      } catch (error) {
         next(error)
      }
   }

   getOrder = async (req, res, next) => {
      try {
         const { id } = req.params
         const order = await models.order.findById(id)
         if (!order) {
            const order = await models.order.findOne({ tableId: id })
            if (!order) {
               throw new Error({
                  statusCode: 400,
                  message: 'order not found',
               })
            }
            return res.status(200).json({
               message: 'order found successfully',
               order,
            })
         }
         return res.status(200).json({
            message: 'order found successfully',
            order,
         })
      } catch (error) {
         next(error)
      }
   }

   getOrders = async (req, res, next) => {
      try {
        const orders = await models.order.find().populate({
          path: 'tableId',
          select: 'tableName' // Chọn trường tableName từ collection Table
        });
    
        // Chuyển đổi kết quả để có thêm trường tableName
        const results = orders.map(order => ({
          ...order.toObject(),
          tableName: order.tableId ? order.tableId.tableName : null
        }));
    
        return res.status(200).json({
          message: 'orders found successfully',
          orders: results,
        });
      } catch (error) {
        next(error);
      }
    };

   updateOrder = async (req, res, next) => {
      try {
         const { id } = req.params
         const order = await models.order.findById(id)
         if (!order) {
            throw new Error({
               statusCode: 400,
               message: 'order not found',
            })
         }
         await models.order.findByIdAndUpdate(id, req.body)
         return res.status(200).json({
            message: 'order updated successfully',
            order,
         })
      } catch (error) {
         next(error)
      }
   }

   getOrdersByDate = async (req, res, next) => {
      try {
         // Định nghĩa khoảng thời gian
         const startDate = new Date(req.body.startDate)
         console.log('🚀 ~ Order ~ getOrdersByDate= ~ startDate:', startDate)
         const endDate = new Date(req.body.endDate)
         console.log('🚀 ~ Order ~ getOrdersByDate= ~ endDate:', endDate)

         // Tạo query để lọc dữ liệu
         const query = {
            orderDate: {
               $gte: startDate,
               $lte: endDate,
            },
         }
         const orders = await models.order.find(query)
         return res.status(200).json({
            message: 'orders found successfully',
            orders,
         })
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new Order()
