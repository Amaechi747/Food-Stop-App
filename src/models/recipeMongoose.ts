import mongoose, {Schema} from 'mongoose';


const recipeMongooseSchema = new Schema({
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
    } ,
    ingredients: [
        {
            name: {type: String, required: [true, 'Name is required']},
            price: {type: Number, required: [true, 'Price is required']}
        }
    ],
    preparation: String,
    created_At: {type: Date, default: Date.now},
    updated_At: {type: Date, default: Date.now}
})



export const Recipe = mongoose.model('Recipe', recipeMongooseSchema);




export const saveRecipe = async function(data: IRecipeData){
    try{
        const created_At = new Date().toISOString();
        const updated_At = new Date().toISOString();
        const recipe = {...data, created_At, updated_At};
        const newRecipe = new Recipe({...recipe})

        //Save Recipe
        const isSaved = await newRecipe.save()
        if(isSaved){
            return true;
        }
    }catch(error){
        console.log(error)
    }
        
}

let pageForwardTracker = 0;
let pageBackwardTracker = 0;
export const getAllRecipes = async function(){
    try {
        const skipCalculator = 0;
        const recipes = await Recipe.find()
            .skip(skipCalculator)
            .limit(5)
            .exec();
        if(recipes){
            return recipes;
        }
    } catch (error: any) {
        throw new Error(error);
    }
    
}

export const getAllRecipesByPagination = async function(pageNo: number){
    try {
        const pageLimit = 5;
        const skipValue = (pageLimit * pageNo) - pageLimit;
        pageForwardTracker = skipValue + 5;
        pageBackwardTracker = skipValue + 5;
        const recipes = await Recipe.find()
            .skip(skipValue)
            .limit(pageLimit)
            .exec();
        if(recipes){
            console.log(recipes)
            return recipes;
        }
        
    } catch (error: any) {
        console.log('Bug',error)
        throw new Error(error)
    }
}

export const paginationNext = async function(){
    try {
        if(pageForwardTracker !== 15){
            pageForwardTracker += 5; 
        }
        console.log('Next', pageForwardTracker)
        const recipes = await Recipe.find()
        .skip(pageForwardTracker)
        .limit(5)
        .exec();
    if(recipes){
        console.log(recipes)
        return recipes;
    }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const paginationPrevious = async function(){
    try {

        if(pageBackwardTracker === 0){
            pageBackwardTracker = 0; 
        }
        if(pageBackwardTracker > 0){
            pageBackwardTracker -= 5
        }
        console.log('Prev', pageBackwardTracker)
        const recipes = await Recipe.find()
        .skip(pageBackwardTracker)
        .limit(5)
        .exec();
    if(recipes){
        console.log(recipes)
        return recipes;
    }
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getSavedRecipe = async function(_id: unknown){
        try{
            if(_id ){
                console.log(_id)
                const recipe = await Recipe.findById(_id).exec();
                return recipe;
            }
        }catch(error){

        }
}

export const updateRecipeData = async function(id: any, data: any){
    try{
          // Get update
          const {title, meal_type, difficulty_level, ingredients, preparation} = data;
          
        
          //Get previous data
          const recipeOldData = await getSavedRecipe(id);
         
          if (recipeOldData){
              // Update
              const newData: any = {};
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
              
              const newUpdate = await Recipe.findByIdAndUpdate(id, {$set: {...newData}}, {new: true}).exec();
              console.log(newUpdate)
              return newUpdate;
  
  
  
          }
    }catch(error: any){
        throw new Error(error)
    }
}




export const deleteRecipeData = async function(id: any){
    try{
        const isDeleted = await Recipe.findByIdAndRemove(id).exec();
        return isDeleted;
    }catch(error: any){
        throw new Error(error);
    }
}