import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import {validateUserRegistrationDetails, validateUserLoginDetails} from '../models/userSchema';
import {saveUserData, authenticateUser} from '../models/userMongooseSchema';
import {getAllRecipes} from '../models/recipeMongoose'
import { convertCompilerOptionsFromJson } from 'typescript';

export const registerPage = function(req: Request, res: Response, next: NextFunction){
    res.status(200).render('register', {title: 'Register', token: '', user: ''})
} 

export const loginPage = function(req: Request, res: Response, next: NextFunction){
    res.status(200).render('login', {title: 'Login', token: '', user: ''})
} 

export const registerUser = asyncHandler(async (req: Request, res: Response) =>{
    try {
        const newUserData: IUserRegistrationDetails = req.body;
        const result = await validateUserRegistrationDetails(newUserData);
        //Save user data
        const isSaved = await saveUserData(result)
        if(isSaved){
            const {email, name} = isSaved;
            console.log('Bug',email)
            //  Generate token
            const token = await generateToken(email);
            console.log(token)
            res.cookie('token', token);
            const recipes = await getAllRecipes();
            const count = recipes?.length;
            const pageNo =  1
            // res.status(201).render('recipe', {title: 'Recipes', token: token , user: name , recipes, count })
            // return;
            if(count !== undefined){
                res.status(200).render('recipe', { title: 'Recipes' , token, user: name || '', recipes, pageNo, count});
                return;
            }

        }
    
    } catch (error: any) {
        const {message} = error.details[0];
        console.log(error)
        res.status(400);
        throw new Error(message)
    }    
})


export const loginUser = async (req: Request, res: Response) => {
    const data: IUser = req.body;
    const isValid = await validateUserLoginDetails(data)

    const isAuthenticated = await authenticateUser(isValid);
    const {email, name} = isAuthenticated;
    // // Generate token
    const token = await generateToken(email);
    console.log(token)
    res.cookie('token', token);
    //Set user
    let user = name
    if (token){
      res.cookie('user', user)
      res.cookie('token', token)
    }
    res.status(200).redirect('/recipes')
}


export const logoutUser = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    
    res.cookie('token', '')
    req.cookies.token = ''
    res.cookie('user', '')
    req.cookies.user = '';
    
    res.status(200).redirect('/user/login');
 
 
})

// Generate Token
const generateToken = function(id: string){
    console.log(id)
    if(process.env.JWT_SECRET ){
        return jwt.sign({id}, process.env.JWT_SECRET, {
          expiresIn: '30d',
      })
    }
      
}
