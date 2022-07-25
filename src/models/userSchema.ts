import Joi, {ValidationError} from 'joi'


const usersSignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),
})



const usersLoginSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
    .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
   
})


//Validate user function
export const validateUserRegistrationDetails = async function(data: IUserRegistrationDetails){
    try {
        const value = await usersSignUpSchema
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


export const validateUserLoginDetails = async function(data: IUser){
    try {
        const value = await usersLoginSchema
            .validateAsync({...data});
        if(value){
            return value
        }
    } catch (error:unknown ) {
        if (error instanceof ValidationError){
            const {message} = error.details[0];
            console.log(message)
            throw new Error(message);
        }
           
    }
}


