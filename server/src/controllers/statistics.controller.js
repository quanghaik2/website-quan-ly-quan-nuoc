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

         let stats = {
            items: [],
         };

         orders.forEach((order) => {
            const date = new Date(order.orderDate);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
            if (!stats.month) {
               stats = {
                  month: monthYear,
                  ...stats,
               };
            }

            order.products.forEach((product) => {
               const found = stats.items.some(
                  (item) => item.name === product.nameProduct
               );
               if (found) {
                  stats.items.forEach((item) => {
                     if (item.name === product.nameProduct) {
                        item.quantity += product.quantity;
                     }
                  });
               } else {
                  stats.items.push({
                     name: product.nameProduct,
                     quantity: product.quantity,
                  });
               }
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

         let stats = {
            items: [],
            date: startDate,
         };
         orders.forEach((order) => {
            // const date = new Date(order.orderDate);
            // const day = date.toISOString().split('T')[0]; // format YYYY-MM-DD

            order.products.forEach((product) => {
               const found = stats.items.some(
                  (item) => item.name === product.nameProduct
               );
               if (found) {
                  stats.items.forEach((item) => {
                     if (item.name === product.nameProduct) {
                        item.quantity += product.quantity;
                     }
                  });
               } else {
                  stats.items.push({
                     name: product.nameProduct,
                     quantity: product.quantity,
                  });
               }
            });
         });
         stats.income = orders.reduce((total, order) => {
            return total + order.total_amount;
         }, 0);

         const storageImport = await models.storageStatistic
            .find({
               createdAt: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
               },
            })
            .populate('recipe.ingredient');
         const storage = await models.storage.find().populate('ingredient');

         let ingredients = [];
         storageImport.recipe.forEach((item) => {
            storage.forEach((storageItem) => {
               if (item.ingredient._id == storageItem.ingredient._id) {
                  ingredients.push({
                     ingredient: storageItem.ingredient,
                     quantity: item.quantity - storageItem.quantity,
                  });
               }
            });
         });

         const cost = ingredients.reduce((total, item) => {
            return total + item.quantity * item.ingredient.price;
         }, 0);

         stats.cost = cost;
         stats.profit = stats.income - stats.cost;

         return res.status(200).json(stats);
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new Statistics();
