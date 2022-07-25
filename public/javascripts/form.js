'use strict'

const ingredientsSubmit = document.querySelector('#ingredients-submit');
const ingredientsPrice = document.querySelector('#ingredients-price');
const ingredientsName = document.querySelector('#ingredients-name');
const titleID = document.querySelector('#title');
const preparationID = document.querySelector('#preparation');
const mealTypeID = document.querySelector('#meal-type');
const difficultyLevelID = document.querySelector('#difficulty-level');
const form = document.querySelector('#add-form');
const Submit = document.querySelector('#submit') 
const data = document.querySelector('#data') 

const tempStore = [];
ingredientsSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    const name = ingredientsName.value
    const price = ingredientsPrice.value
    const data = {name, price}
    tempStore.push(data)
   
   
})

Submit.addEventListener('click', (e)=>{
    e.preventDefault();
    // console.log('I dey')
    // const newInput = document.createElement('input')
    // const div = document.createElement('div')
    // newInput.name = 'ingredients';
    // newInput.type = 'text';
    // newInput.value = tempStore

    //Get body data
    const title = titleID.value;
    const preparation = preparationID.value;
    const mealType = mealTypeID.value;
    const difficultyLevel = difficultyLevelID.value;
    
    // Send request.
   fetch('/recipes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, meal_type: mealType, difficulty_level: difficultyLevel,ingredients: tempStore, preparation})
   })
    
   
})