const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Orders'
const DOCUMENT_NAME = 'Order'

const orderSchema = new Schema(
   {
      tableId: {
         type: Schema.Types.ObjectId,
         ref: 'Table',
         required: true,
      },
      note: {
         type: String,
      },
<<<<<<< HEAD
      products: [
        {
=======
      product: [
         {
>>>>>>> d875341adfe8920be19979af26deb26254ce3d70
            productId: {
               type: Schema.Types.ObjectId,
               ref: 'Product',
               required: true,
            },
            quantity: {
               type: Number,
               required: true,
            },
            nameProduct: {
               type: String,
               alias: 'product_name',
            }, // Để lưu trữ nameProduct sau khi populate
            price: {
               type: Number,
            }, // Để lưu trữ price sau khi populate
         },
      ],
      status: {
         type: String,
         enum: ['đã lên đơn', 'chờ thu tiền', 'hoàn thành'],
         default: 'đã lên đơn',
      },
      total_amount: {
         type: Number,
      },
      orderDate: {
         type: Date,
         alias: 'order_date',
         default: Date.now(),
      },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
)

const Order = model(DOCUMENT_NAME, orderSchema)

module.exports = Order
