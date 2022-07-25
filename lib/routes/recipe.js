"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeApi_1 = require("../controller/recipeApi");
const middleware_1 = require("../controller/middleware");
const router = express_1.default.Router();
/* GET home page. */
router.get('/next', recipeApi_1.getAllRecipesByPaginationNext);
router.get('/previous', recipeApi_1.getAllRecipesByPaginationPrevious);
router.get('/add_recipe', middleware_1.isAuthorized, recipeApi_1.getAddRecipe);
// router.get('/:id', isAuthorized, getRecipesByPagination)
router.get('/:id', middleware_1.isAuthorized, recipeApi_1.getRecipesByIDPage);
// router.get('/:id', isAuthorized, getRecipesByPagination)
// router.get('/:id', isAuthorized, getRecipesByIDPage)
router.get('/', middleware_1.isAuthorized, recipeApi_1.getRecipes);
router.post('/', middleware_1.isAuthorized, recipeApi_1.addRecipe);
// router.get('/add_recipe',isAuthorized, getAddRecipe)
// router.get('/:id', isAuthorized, getRecipesByIDPage)
router.get('/update/:id', middleware_1.isAuthorized, recipeApi_1.getRecipesUpdateByIDPage);
router.put('/update', middleware_1.isAuthorized, recipeApi_1.updateRecipe);
router.get('/delete/:id', middleware_1.isAuthorized, recipeApi_1.getDeleteRecipePage);
router.delete('/delete/:id', middleware_1.isAuthorized, recipeApi_1.deleteRecipe);
exports.default = router;
//# sourceMappingURL=recipe.js.map