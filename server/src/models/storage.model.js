const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Storage';
const COLLECTION_NAME = 'Storages';

// Declare the Schema of the Mongo model
const storageSchema = new mongoose.Schema(
   {
      ingredient: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Ingredient',
      },
      quantity: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, storageSchema);
