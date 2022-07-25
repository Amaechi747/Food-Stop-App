"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteRecipeData = exports.updateRecipeData = exports.getSavedRecipe = exports.paginationPrevious = exports.paginationNext = exports.getAllRecipesByPagination = exports.getAllRecipes = exports.saveRecipe = exports.Recipe = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const recipeMongooseSchema = new mongoose_1.Schema({
    title: String,
    meal_type: {
        type: String,
        enum: ['breakfast', 'lunch', 'supper', 'snack'],
        default: 'breakfast'
    },
    difficulty_level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    ingredients: [
        {
            name: { type: String, required: [true, 'Name is required'] },
            price: { type: Number, required: [true, 'Price is required'] }
        }
    ],
    preparation: String,
    created_At: { type: Date, default: Date.now },
    updated_At: { type: Date, default: Date.now }
});
exports.Recipe = mongoose_1.default.model('Recipe', recipeMongooseSchema);
const saveRecipe = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const created_At = new Date().toISOString();
            const updated_At = new Date().toISOString();
            const recipe = Object.assign(Object.assign({}, data), { created_At, updated_At });
            const newRecipe = new exports.Recipe(Object.assign({}, recipe));
            //Save Recipe
            const isSaved = yield newRecipe.save();
            if (isSaved) {
                return true;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.saveRecipe = saveRecipe;
let pageForwardTracker = 0;
let pageBackwardTracker = 0;
const getAllRecipes = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const skipCalculator = 0;
            const recipes = yield exports.Recipe.find()
                .skip(skipCalculator)
                .limit(5)
                .exec();
            if (recipes) {
                return recipes;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.getAllRecipes = getAllRecipes;
const getAllRecipesByPagination = function (pageNo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pageLimit = 5;
            const skipValue = (pageLimit * pageNo) - pageLimit;
            pageForwardTracker = skipValue + 5;
            pageBackwardTracker = skipValue + 5;
            const recipes = yield exports.Recipe.find()
                .skip(skipValue)
                .limit(pageLimit)
                .exec();
            if (recipes) {
                console.log(recipes);
                return recipes;
            }
        }
        catch (error) {
            console.log('Bug', error);
            throw new Error(error);
        }
    });
};
exports.getAllRecipesByPagination = getAllRecipesByPagination;
const paginationNext = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (pageForwardTracker !== 15) {
                pageForwardTracker += 5;
            }
            console.log('Next', pageForwardTracker);
            const recipes = yield exports.Recipe.find()
                .skip(pageForwardTracker)
                .limit(5)
                .exec();
            if (recipes) {
                console.log(recipes);
                return recipes;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.paginationNext = paginationNext;
const paginationPrevious = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (pageBackwardTracker === 0) {
                pageBackwardTracker = 0;
            }
            if (pageBackwardTracker > 0) {
                pageBackwardTracker -= 5;
            }
            console.log('Prev', pageBackwardTracker);
            const recipes = yield exports.Recipe.find()
                .skip(pageBackwardTracker)
                .limit(5)
                .exec();
            if (recipes) {
                console.log(recipes);
                return recipes;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.paginationPrevious = paginationPrevious;
const getSavedRecipe = function (_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (_id) {
                console.log(_id);
                const recipe = yield exports.Recipe.findById(_id).exec();
                return recipe;
            }
        }
        catch (error) {
        }
    });
};
exports.getSavedRecipe = getSavedRecipe;
const updateRecipeData = function (id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get update
            const { title, meal_type, difficulty_level, ingredients, preparation } = data;
            //Get previous data
            const recipeOldData = yield (0, exports.getSavedRecipe)(id);
            if (recipeOldData) {
                // Update
                const newData = {};
                //Get old recipe data
                // Get current date   
                const updated_At = new Date().toISOString();
                newData['title'] = title || recipeOldData.title;
                newData['meal_type'] = meal_type || recipeOldData.meal_type;
                newData['difficulty_level'] = difficulty_level || recipeOldData.difficulty_level;
                newData['ingredients'] = ingredients || recipeOldData.ingredients;
                newData['preparation'] = preparation || recipeOldData.preparation;
                newData['created_At'] = recipeOldData.created_At;
                newData['updated_At'] = updated_At;
                const newUpdate = yield exports.Recipe.findByIdAndUpdate(id, { $set: Object.assign({}, newData) }, { new: true }).exec();
                console.log(newUpdate);
                return newUpdate;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.updateRecipeData = updateRecipeData;
const deleteRecipeData = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDeleted = yield exports.Recipe.findByIdAndRemove(id).exec();
            return isDeleted;
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.deleteRecipeData = deleteRecipeData;
//# sourceMappingURL=recipeMongoose.js.map