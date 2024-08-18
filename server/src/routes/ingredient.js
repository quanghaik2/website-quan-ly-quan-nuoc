const ingredientController = require('../controllers/ingredient.controller');

const router = require('express').Router();

router.post('/', ingredientController.createIngredient);

module.exports = router;
