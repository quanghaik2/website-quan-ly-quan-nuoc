const ingredientController = require('../controllers/ingredient.controller');

const router = require('express').Router();

router.get('/:id', ingredientController.getIngredientById);
router.put('/:id', ingredientController.updateIngredient);
router.delete('/:id', ingredientController.deleteIngredient);
router.post('/', ingredientController.createIngredient);
router.get('/', ingredientController.getAllIngredients);

module.exports = router;
