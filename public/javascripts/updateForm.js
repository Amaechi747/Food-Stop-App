'use strict'

const ingredientsSubmit = document.querySelector('#ingredients-submitU');
const ingredientsPrice = document.querySelector('#ingredients-priceU');
const ingredientsName = document.querySelector('#ingredients-nameU');
const titleID = document.querySelector('#titleU');
const preparationID = document.querySelector('#preparationU');
const mealTypeID = document.querySelector('#meal-typeU');
const difficultyLevelID = document.querySelector('#difficulty-levelU');
const form = document.querySelector('#add-formU');
const Submit = document.querySelector('#submitU') 
const data = document.querySelector('#dataU') 
const id = document.querySelector('#idU') 

const tempStore = [];
ingredientsSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    const name = ingredientsName.value
    const price = ingredientsPrice.value
    const data = {name, price}
    tempStore.push(data)
    // const d = JSON.parse(JSON.stringify(id))
    console.log('Bug2',id)
   
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
    let ID = id.value
    console.log('new', ID)
    // Send request.
   fetch(`/recipes/update/?_method=PUT`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({title, meal_type: mealType, difficulty_level: difficultyLevel ,ingredients: tempStore, preparation, id: ID})
   })
    
//    ?_method=PUT
})