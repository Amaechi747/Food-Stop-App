import Joi, {ValidationError} from 'joi';


// Recipe Schema

const recipeSchema = Joi.object({
    title: Joi.string()
        .required(),

    meal_type: Joi.string()
        .required(),

    difficulty_level: Joi.string()
        .required(),

    ingredients: Joi.array().items(
        Joi.object({
            name: Joi.string()
                .required(),

            price: Joi.number()
                .required()
        })
    )
        .required(),

    preparation: Joi.string()
        .required()  
})


//Validate user function
export const recipeSchemaValidator = async function(data:IRecipeData){
    try {
        const value = await recipeSchema
            .validateAsync({...data});
        if(value){
            return value;
        }
    } catch (error:unknown ) {
        if (error instanceof ValidationError){
            const {message} = error.details[0];
            console.log(message)
            throw new Error(message);
        }
           
    }
}
















