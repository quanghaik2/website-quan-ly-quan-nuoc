const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Products'
const DOCUMENT_NAME = 'Product'

const productSchema = new Schema(
   {
      productName: {
         type: Number,
         required: true,
         alias: 'product_name',
      },
      category: {
         type: Number,
         required: true,
         default: 'đồ uống',
         enum: ['đồ uống', 'đồ ăn vặt'],
      },
      status: {
         type: Boolean,
         default: false,
      },
      price: {
         type: Number,
         default: 0,
      },
      image: {
         type: String,
         required: true,
      },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
)

const Product = model(DOCUMENT_NAME, productSchema)

module.exports = Product
