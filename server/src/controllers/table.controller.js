
const models = require('../models')

class Table {
    createTable = async (req,res,next) => {
        try {
            const {tableName} = req.body;
            if(!tableName) 
                throw new Error({
                    statusCode: 400,
                    message: 'Missing required fields',
                 })
            console.log(tableName)
            const table = await models.table.findOne({tableName: tableName});
            
            if(table) {
                throw new Error({
                    statusCode: 400,
                    message: 'Table already exists',
                 })
            }
            const newTable = new models.table({tableName});
                await newTable.save();
                return res.status(200).json({message: 'Create table successfully',newTable});
            
                
            
            
        } catch (error) {
         next(error);   
        }
    };

    
}

module.exports = new Table();

