# week-11A-node

## 1. Implement this task using MongoDB

### Setup

1. Your are required to use `TypeScript` for the task and build the APIs (endpoints) with `express`
2. Use and setup the project with `Yarn`

## Problem Description:

Your task is to build a food recipe management app. This app will help it's users to management food recipes.

Your recipe data structure looks like the following:

```
 {  
    title: "Jamaican Jollof Rice",

    meal_type: "breakfast" or "lunch" or "supper" or "snack" ( Hint: use enum ),

    difficulty_level: "Beginner" or "Intermediate" or "Advanced" (Hint: use enum),

    ingredients: [
      {name: "onions", price:"50"},
      {name: "4 cups of rice", price:"3000"},
      ...
    ],

    preparation: "Boil the water for 10mins, rinse the rice, fry the pepper, add salt, maggi and pepper"
}
```

Additional Info:
Your database should have the following collection

- recipe_collection

  - title
  - meal_type
  - difficulty_level
  - ingredients
  - preparation
  - created_At
  - updated_At

- user_collection
  - email (unique)
  - password
  - fullname
  - created_At
  - updated_At

### Endpoints to Implement and test

| Method | Endpoint           | Enable a user to:                       |
| :----- | :----------------- | :-------------------------------------- |
| POST   | /user/signup       | Enable user signup                      |
| POST   | /user/login        | Enable user to login                    |
| GET    | /user/logout       | Get all recipes that a user has created |
| GET    | /recipes           | Get all recipes that a user has created |
|        | /recipes/:recipeId | Getting recipe by its id                |
| POST   | /recipes           | To create a recipe                      |
| PUT    | /recipes/:recipeId | To update recipe by id                  |
| DELETE | /recipes/:recipeId | To delete a recipe by id                |

## Clarification

- implement pagination, with limit of 5 values for each page
- Create Authentication and Authorization for users using a middleware function
- Implement Validation for incoming request using Joi
- Only registered users can access all recipes endpoint
- Use mongoDB-compass for local development

## Test coverage (Test is mandatory - no test equals 0 (zero) marks):

- Make sure you write test to cover your application using supertest
- Test your database using mongodb-memory-server
- Test all endpoints (GET, POST, PUT, DELETE)

## Documentation

- document your API with postman

## Hosting

- Host your application on Heroku

## 2. Mongo Aggregation Exercise.

- Go through the readme file `MongoAggregation.md`
