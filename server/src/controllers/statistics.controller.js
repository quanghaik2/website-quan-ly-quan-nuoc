const models = require('../models');

class Statistics {
   getMonthlyStatistics = async (req, res, next) => {
      try {
         const startDate = new Date(req.body.startDate);
         const endDate = new Date(req.body.endDate);
         const orders = await models.order
            .find({
               orderDate: {
                  $gte: startDate,
                  $lte: endDate,
               },
            })
            .populate('products.productId');

         let stats = {};
         orders.forEach((order) => {
            const date = new Date(order.orderDate);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

            if (!stats[monthYear]) {
               stats[monthYear] = { items: {} };
            }

            order.products.forEach((product) => {
               if (!stats[monthYear].items[product.nameProduct]) {
                  stats[monthYear].items[product.nameProduct] = { quantity: 0 };
               }
               stats[monthYear].items[product.nameProduct].quantity +=
                  product.quantity;
            });
         });
         stats.total = orders.reduce((total, order) => {
            return total + order.total_amount;
         }, 0);

         return res.status(200).json(stats);
      } catch (error) {
         next(error);
      }
   };

   getDailyStatistics = async (req, res, next) => {
      try {
         const { startDate, endDate } = req.body;
         const orders = await models.order
            .find({
               orderDate: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
               },
            })
            .populate('products.productId');

         const stats = {};
         orders.forEach((order) => {
            const date = new Date(order.orderDate);
            const day = date.toISOString().split('T')[0]; // format YYYY-MM-DD

            if (!stats[day]) {
               stats[day] = { items: {} };
            }

            order.products.forEach((product) => {
               if (!stats[day].items[product.nameProduct]) {
                  stats[day].items[product.nameProduct] = { quantity: 0 };
               }
               stats[day].items[product.nameProduct].quantity +=
                  product.quantity;
            });
         });
         stats.total = orders.reduce((total, order) => {
            return total + order.total_amount;
         }, 0);

         return res.status(200).json(stats);
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new Statistics();
