"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.getDeleteRecipePage = exports.updateRecipe = exports.getRecipesUpdateByIDPage = exports.getRecipesByIDPage = exports.addRecipe = exports.getAllRecipesByPaginationPrevious = exports.getAllRecipesByPaginationNext = exports.getRecipesByPagination = exports.getAddRecipe = exports.getRecipes = void 0;
const recipeSchema_1 = require("../models/recipeSchema");
const recipeMongoose_1 = require("../models/recipeMongoose");
const getRecipes = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            const user = req.cookies.user;
            const recipes = yield (0, recipeMongoose_1.getAllRecipes)();
            const pageNo = 1;
            const count = recipes === null || recipes === void 0 ? void 0 : recipes.length;
            if (count !== undefined) {
                res.status(200).render('recipe', { title: 'Recipes', token, user: user || '', recipes, pageNo, count });
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getRecipes = getRecipes;
const getAddRecipe = function (req, res, next) {
    try {
        const token = req.cookies.token;
        const user = req.cookies.user;
        res.status(200).render('addRecipe', { title: 'Add Recipe', token, user });
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAddRecipe = getAddRecipe;
const getRecipesByPagination = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pageNo = Number(req.params.id) || 1;
            const token = req.cookies.token;
            const user = req.cookies.user;
            console.log("I am here now");
            const recipes = yield (0, recipeMongoose_1.getAllRecipesByPagination)(pageNo);
            const count = recipes === null || recipes === void 0 ? void 0 : recipes.length;
            if (recipes && (count !== undefined)) {
                res.status(200).render('recipe', { title: 'Recipes', token, user: user || '', recipes, pageNo, count });
                return;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getRecipesByPagination = getRecipesByPagination;
const getAllRecipesByPaginationNext = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            const user = req.cookies.user;
            const recipes = yield (0, recipeMongoose_1.paginationNext)();
            const count = recipes === null || recipes === void 0 ? void 0 : recipes.length;
            if (recipes && (count !== undefined)) {
                res.status(200).render('recipe', { title: 'Recipes', token, user: user || '', recipes, count });
                return;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getAllRecipesByPaginationNext = getAllRecipesByPaginationNext;
const getAllRecipesByPaginationPrevious = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            const user = req.cookies.user;
            const recipes = yield (0, recipeMongoose_1.paginationPrevious)();
            const count = recipes === null || recipes === void 0 ? void 0 : recipes.length;
            if (recipes && (count !== undefined)) {
                res.status(200).render('recipe', { title: 'Recipes', token, user: user || '', recipes, count });
                return;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getAllRecipesByPaginationPrevious = getAllRecipesByPaginationPrevious;
const addRecipe = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = req.body;
            const validResult = yield (0, recipeSchema_1.recipeSchemaValidator)(data);
            if (validResult) {
                yield (0, recipeMongoose_1.saveRecipe)(validResult);
                res.status(200).redirect('/recipes');
            }
        }
        catch (error) {
            // console.log(error)
        }
    });
};
exports.addRecipe = addRecipe;
const getRecipesByIDPage = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { token, user } = req.cookies;
            const recipe = yield (0, recipeMongoose_1.getSavedRecipe)(id);
            console.log(user);
            res.status(200).render('getRecipe', { title: 'Get Recipe', token, user, recipe });
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getRecipesByIDPage = getRecipesByIDPage;
const getRecipesUpdateByIDPage = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { token, user } = req.cookies;
            const recipe = yield (0, recipeMongoose_1.getSavedRecipe)(id);
            if (recipe) {
                const id = JSON.parse(JSON.stringify(recipe._id));
                res.status(200).render('updateRecipe', { title: 'Update Recipe', token, user, id });
                return;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getRecipesUpdateByIDPage = getRecipesUpdateByIDPage;
const updateRecipe = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const {id} = req.params;
            const incomingData = req.body;
            const { id } = req.body;
            console.log('New man:', id);
            const isUpdated = yield (0, recipeMongoose_1.updateRecipeData)(id, incomingData);
            if (isUpdated) {
                res.status(200).redirect('/recipes');
                return;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.updateRecipe = updateRecipe;
const getDeleteRecipePage = function (req, res, next) {
    try {
        const { id } = req.params;
        const { token, user } = req.cookies;
        res.status(200).render('deleteRecipe', { title: 'Delete Recipe', token, user, id });
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getDeleteRecipePage = getDeleteRecipePage;
const deleteRecipe = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            console.log(id);
            const isDeleted = yield (0, recipeMongoose_1.deleteRecipeData)(id);
            res.status(200).redirect('/recipes');
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.deleteRecipe = deleteRecipe;
//# sourceMappingURL=recipeApi.js.map