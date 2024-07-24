const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Products'
const DOCUMENT_NAME = 'Product'

const productSchema = new Schema(
   {
      productName: {
        type: String,
        required: true,
        alias: 'product_name',
      },
      category: {
        type: String,
        required: true,
        default: 'Đồ uống',
        enum: ['Đồ uống', "Đồ ăn vặt"],
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
