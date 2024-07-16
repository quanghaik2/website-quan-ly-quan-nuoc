const models = require('../models');

const login = async (req, res, next) => {
    try{
        const user = models.user.findOne(req.body);
        
    } catch(error) {
        next(error);
    }
 };