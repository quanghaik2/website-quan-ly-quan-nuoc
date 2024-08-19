const models = require('../models');

class StatisticStorage {
   createStatisticStorage = async (req, res, next) => {
      try {
         const { status, recipe } = req.body;

         if (!status || !recipe) {
            return res.status(400).json({
               message: 'Missing required fields',
            });
         }
         const newStatisticStorage = new models.storageStatistic({
            status,
            recipe,
         });

         if (status === 'out') {
            for (let item of recipe) {
               const isExist = await models.storage.findOne({
                  ingredient: item.ingredient,
               });

               if (!isExist) {
                  return res.status(400).json({
                     message: 'Ingredient not found: ' + item.ingredient.name,
                  });
               }
               if (isExist.quantity < item.quantity) {
                  return res.status(400).json({
                     message: 'Not enough quantity: ' + isExist.ingredient.name,
                  });
               }
               if (isExist.quantity === 0) {
                  return res.status(400).json({
                     message: 'Out of stock: ' + isExist.ingredient.name,
                  });
               }
            }

            for (let item of recipe) {
               await models.storage.updateOne(
                  { ingredient: item.ingredient },
                  { $inc: { quantity: -item.quantity } }
               );
            }
         } else {
            for (let item of recipe) {
               const isExist = await models.storage.findOne({
                  ingredient: item.ingredient,
               });
               if (!isExist) {
                  const newStorage = new models.storage({
                     ingredient: item.ingredient,
                     quantity: item.quantity,
                  });
                  await newStorage.save();
               } else {
                  await models.storage.updateOne(
                     { ingredient: item.ingredient },
                     { $inc: { quantity: item.quantity } }
                  );
               }
            }
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

   getStatisticStorage = async (req, res, next) => {
      try {
         const statisticStorage = await models.storageStatistic
            .find()
            .populate('recipe.ingredient');
         return res.status(200).json(statisticStorage);
      } catch (error) {
         next(error);
      }
   };

   getStorageList = async (req, res, next) => {
      try {
         const storageList = await models.storage.find().populate('ingredient');
         return res.status(200).json(storageList);
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new StatisticStorage();
