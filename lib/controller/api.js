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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = exports.loginPage = exports.registerPage = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = require("../models/userSchema");
const userMongooseSchema_1 = require("../models/userMongooseSchema");
const recipeMongoose_1 = require("../models/recipeMongoose");
const registerPage = function (req, res, next) {
    res.status(200).render('register', { title: 'Register', token: '', user: '' });
};
exports.registerPage = registerPage;
const loginPage = function (req, res, next) {
    res.status(200).render('login', { title: 'Login', token: '', user: '' });
};
exports.loginPage = loginPage;
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserData = req.body;
        const result = yield (0, userSchema_1.validateUserRegistrationDetails)(newUserData);
        //Save user data
        const isSaved = yield (0, userMongooseSchema_1.saveUserData)(result);
        if (isSaved) {
            const { email, name } = isSaved;
            console.log('Bug', email);
            //  Generate token
            const token = yield generateToken(email);
            console.log(token);
            res.cookie('token', token);
            const recipes = yield (0, recipeMongoose_1.getAllRecipes)();
            const count = recipes === null || recipes === void 0 ? void 0 : recipes.length;
            const pageNo = 1;
            // res.status(201).render('recipe', {title: 'Recipes', token: token , user: name , recipes, count })
            // return;
            if (count !== undefined) {
                res.status(200).render('recipe', { title: 'Recipes', token, user: name || '', recipes, pageNo, count });
                return;
            }
        }
    }
    catch (error) {
        const { message } = error.details[0];
        console.log(error);
        res.status(400);
        throw new Error(message);
    }
}));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isValid = yield (0, userSchema_1.validateUserLoginDetails)(data);
    const isAuthenticated = yield (0, userMongooseSchema_1.authenticateUser)(isValid);
    const { email, name } = isAuthenticated;
    // // Generate token
    const token = yield generateToken(email);
    console.log(token);
    res.cookie('token', token);
    //Set user
    let user = name;
    if (token) {
        res.cookie('user', user);
        res.cookie('token', token);
    }
    res.status(200).redirect('/recipes');
});
exports.loginUser = loginUser;
exports.logoutUser = (0, express_async_handler_1.default)(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.cookie('token', '');
        req.cookies.token = '';
        res.cookie('user', '');
        req.cookies.user = '';
        res.status(200).redirect('/user/login');
    });
});
// Generate Token
const generateToken = function (id) {
    console.log(id);
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    }
};
//# sourceMappingURL=api.js.map