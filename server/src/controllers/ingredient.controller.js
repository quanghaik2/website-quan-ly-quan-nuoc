const models = require('../models');

class Ingredient {
   createIngredient = async (req, res) => {
      try {
         const { name, unit, price } = req.body;
         const newIngredient = new models.ingredient({
            name,
            unit,
            price,
         });
         await newIngredient.save();
         return res.status(200).json({
            message: 'Ingredient created successfully',
            newIngredient,
         });
      } catch (error) {
         next(error);
      }
   };

   updateIngredient = async (req, res) => {
      try {
         const { id } = req.params;
         const { name, unit, price } = req.body;

         if (!name || !unit || !price) {
            return res
               .status(400)
               .json({ message: 'Chưa nhập đầy đủ thông tin nguyên liệu' });
         }

         const updatedIngredient = await models.ingredient.findByIdAndUpdate(
            id,
            { name, unit, price },
            { new: true }
         );

         if (!updatedIngredient) {
            return res
               .status(404)
               .json({ message: 'Nguyên liệu không tồn tại' });
         }

         return res
            .status(200)
            .json({
               message: 'Cập nhật nguyên liệu thành công',
               updatedIngredient,
            });
      } catch (error) {
         next(error);
      }
   };

   deleteIngredient = async (req, res) => {
      try {
         const { id } = req.params;
         const deletedIngredient = await models.ingredient.findByIdAndDelete(
            id
         );

         if (!deletedIngredient) {
            return res
               .status(404)
               .json({ message: 'Nguyên liệu không tồn tại' });
         }

         return res.status(200).json({ message: 'Xóa nguyên liệu thành công' });
      } catch (error) {
         next(error);
      }
   };
}

module.exports = new Ingredient();
