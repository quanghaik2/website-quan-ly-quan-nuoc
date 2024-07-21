const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'Users'
const DOCUMENT_NAME = 'User'

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: ['owner', 'staff'],
         default: 'staff',
      },
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
)

const User = model(DOCUMENT_NAME, userSchema)

module.exports = User
