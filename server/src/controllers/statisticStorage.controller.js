const models = require('../models');

class StatisticStorage {
   createStatisticStorage = async (req, res) => {
      try {
         const { status, recipe } = req.body;

         if (!status || !recipe) {
            return res.status(400).json({
               message: 'Missing required fields',
            });
         }
         const newStatisticStorage = new models.statisticStorage({
            status,
            recipe,
         });

         // await models.storage.updateMany(
         //    { ingredient: { $in: recipe.map((item) => item.ingredient) } },
         //    { $inc: { quantity: -item.quantity } }
         // );
         for (let item of recipe) {
            await models.storage.updateOne(
               { ingredient: item.ingredient },
               { $inc: { quantity: item.quantity } }
            );
         }

         await newStatisticStorage.save();

         return res.status(200).json({
            message: 'StatisticStorage created successfully',
            data: newStatisticStorage,
         });
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new StatisticStorage();
