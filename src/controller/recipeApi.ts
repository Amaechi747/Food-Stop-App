import {Request, Response, NextFunction} from 'express';
import {recipeSchemaValidator} from '../models/recipeSchema';
import {saveRecipe, getAllRecipes, getSavedRecipe, updateRecipeData, deleteRecipeData, getAllRecipesByPagination, paginationNext, paginationPrevious} from '../models/recipeMongoose';
import { number } from 'joi';

export const getRecipes = async function(req: Request, res: Response, next: NextFunction) {
    try{
        const token = req.cookies.token;
        const user = req.cookies.user;
        const recipes = await getAllRecipes();
        const pageNo = 1;
        const count = recipes?.length;
        if(count !== undefined){
            res.status(200).render('recipe', { title: 'Recipes' , token, user: user || '', recipes, pageNo, count});
        }
    }catch(error: any){
        throw new Error( error)
    }
   
}


export const getAddRecipe = function(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.token;
        const user = req.cookies.user;

        res.status(200).render('addRecipe', {title: 'Add Recipe',token, user})
    } catch (error: any) {
        throw new Error(error);
    }
   
}


export const getRecipesByPagination = async function(req: Request, res: Response, next: NextFunction){
    try {
        const pageNo = Number(req.params.id) || 1;
        const token = req.cookies.token;
        const user = req.cookies.user;
        console.log("I am here now")
        const recipes = await getAllRecipesByPagination(pageNo);
        const count = recipes?.length;
        if(recipes && (count !== undefined) ){
            res.status(200).render('recipe', { title: 'Recipes' , token, user: user || '', recipes, pageNo, count});
            return;
        }

    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllRecipesByPaginationNext = async function(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.token;
        const user = req.cookies.user;
        const recipes = await paginationNext();
        const count = recipes?.length;
        if(recipes && (count !== undefined) ){
            res.status(200).render('recipe', { title: 'Recipes' , token, user: user || '', recipes, count});
            return;
        }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllRecipesByPaginationPrevious = async function(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.cookies.token;
        const user = req.cookies.user;
        const recipes = await paginationPrevious();
        const count = recipes?.length;
        if(recipes && (count !== undefined) ){
            res.status(200).render('recipe', { title: 'Recipes' , token, user: user || '', recipes, count});
            return;
        }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const addRecipe = async function(req: Request, res: Response, next: NextFunction){
    try{
        const data:IRecipeData = req.body;
        const validResult = await recipeSchemaValidator(data)
        if( validResult ){
            await saveRecipe(validResult)
            res.status(200).redirect('/recipes')

        }
    }catch(error: any){
        // console.log(error)
    }
 
}

export const getRecipesByIDPage = async function(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params;
        const {token, user} = req.cookies
        const recipe = await getSavedRecipe(id)
        console.log(user)
        res.status(200).render('getRecipe', { title: 'Get Recipe', token, user, recipe})

    }catch(error: any){
        throw new Error(error)
    }
}


export const getRecipesUpdateByIDPage = async function(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params;
        const {token, user} = req.cookies;
        const recipe = await getSavedRecipe(id);
        if(recipe){
            const id = JSON.parse(JSON.stringify(recipe._id)) ;
            res.status(200).render('updateRecipe', {title: 'Update Recipe', token, user, id})
            return;
        }
    }catch(error: any){
        throw new Error(error)
    }
}



export const updateRecipe = async function(req: Request, res: Response, next: NextFunction){
    try{
        // const {id} = req.params;
        const incomingData = req.body;
        const {id} = req.body
        console.log('New man:', id)
        const isUpdated = await updateRecipeData(id, incomingData);
        if(isUpdated){
            res.status(200).redirect('/recipes');
            return;
        }
      
    }catch(error: any){
        throw new Error(error)
    }
}



export const getDeleteRecipePage = function(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params;
        const {token, user} = req.cookies;
        res.status(200).render('deleteRecipe', {title: 'Delete Recipe' ,token, user, id})
    }catch(error: any){
        throw new Error(error);
    }
}



export const deleteRecipe = async function(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params;
        console.log(id)
        const isDeleted = await deleteRecipeData(id)
        res.status(200).redirect('/recipes');
    }catch(error: any){
        throw new Error(error)
    }
}