const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'StorageStatistic';
const COLLECTION_NAME = 'StorageStatistics';

// Declare the Schema of the Mongo model
const StorageStatisticSchema = new mongoose.Schema(
   {
      status: {
         type: String,
         required: true,
         enum: ['out', 'in'],
      },
      recipe: [
         {
            ingredient: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Ingredient',
            },
            quantity: { type: Number },
         },
      ],
   },
   {
      timestamps: true,
      collection: COLLECTION_NAME,
   }
);
const StorageStatistic = mongoose.model(DOCUMENT_NAME, StorageStatisticSchema);
//Export the model
module.exports = StorageStatistic;
