import express, { Request, Response, NextFunction } from "express";
import {getRecipes, addRecipe, getAddRecipe,getRecipesByPagination, getRecipesByIDPage, getRecipesUpdateByIDPage, updateRecipe, getDeleteRecipePage, deleteRecipe, getAllRecipesByPaginationNext, getAllRecipesByPaginationPrevious} from '../controller/recipeApi';
import { isAuthorized } from "../controller/middleware";

const router = express.Router();

/* GET home page. */
router.get('/next', getAllRecipesByPaginationNext)
router.get('/previous', getAllRecipesByPaginationPrevious)
router.get('/add_recipe',isAuthorized, getAddRecipe)
// router.get('/:id', isAuthorized, getRecipesByPagination)
router.get('/:id', isAuthorized, getRecipesByIDPage)
// router.get('/:id', isAuthorized, getRecipesByPagination)
// router.get('/:id', isAuthorized, getRecipesByIDPage)
router.get('/', isAuthorized, getRecipes);
router.post('/',isAuthorized, addRecipe);
// router.get('/add_recipe',isAuthorized, getAddRecipe)
// router.get('/:id', isAuthorized, getRecipesByIDPage)
router.get('/update/:id', isAuthorized, getRecipesUpdateByIDPage)
router.put('/update', isAuthorized, updateRecipe);
router.get('/delete/:id', isAuthorized, getDeleteRecipePage)
router.delete('/delete/:id', isAuthorized, deleteRecipe)


export default router;


