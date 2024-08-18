const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Ingredient';
const COLLECTION_NAME = 'Ingredients';

// Declare the Schema of the Mongo model
const ingredientSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true,
         index: true,
      },
      price: {
         type: Number,
         required: true,
      },
      unit: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);
const Ingredient = mongoose.model(DOCUMENT_NAME, ingredientSchema);
//Export the model
module.exports = Ingredient;
