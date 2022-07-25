import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

const userSchema = new Schema<IUserModel>({
    name: String,
    email: {type: String, unique: true},
    password: String,
    created_At: {type: Date, default: Date.now},
    updated_At: {type: Date, default: Date.now}
})

const User = mongoose.model('User', userSchema);

export const saveUserData = async function(data: IUserRegistrationDetails){
    try{
        const {name, email, password} = data;
        //Check database for uniqueness
        // const isRegistered = await User.findOne({email})

        // if(isRegistered instanceof Object){
        //     throw new Error('User already exists');
        // }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Get date 
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        //Create user and save
        const newUser = new User({name, email, password: hashedPassword, created_At: createdAt, updated_At: updatedAt})
        const isSaved = await newUser.save();
        if(isSaved){
            return data;
        }
        
    }catch(error: any){
        throw new Error(error);
        
    }


}


export const authenticateUser = async function(data: IUser){
    try{
        const {email, password} = data;
        const isRegistered = await User.findOne({email})
        if(isRegistered && (await bcrypt.compare(password, isRegistered.password))){
            return isRegistered;
        }else{
            throw new Error('Invalid email or Password')
        }
    }catch(error: any){
        // const {message} = error.details[0];
        console.log(error)
        throw Error(error)
    }
   
    

}
