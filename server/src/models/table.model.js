const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'Tables';
const DOCUMENT_NAME = 'Table';

const tableSchema = new Schema(
   {
     tableName: {
        type: String,
        required: true,
        alias: 'table_name',
     },
     status: {
        type: Boolean,
        default: false,
     }
   },
   {
      collection: COLLECTION_NAME,
      timestamps: true,
   }
);

const Table = model(DOCUMENT_NAME, tableSchema);

module.exports = Table;

