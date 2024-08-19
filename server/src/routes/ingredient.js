const ingredientController = require('../controllers/ingredient.controller');

const router = require('express').Router();

router.get('/:id', ingredientController.getIngredientById);
router.post('/', ingredientController.createIngredient);
router.get('/', ingredientController.getAllIngredients);

module.exports = router;
