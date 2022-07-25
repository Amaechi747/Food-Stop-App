import mongoose, {Schema, model} from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server';


let mongoServer: any = null;
  

export const dbConnect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();
    const mongooseOpts: any = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    await mongoose.connect(uri, mongooseOpts);
}


export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if(mongoServer){
        mongoServer.stop();
    }
}

export const dropCollections = async function(){
    if(mongoServer){
        const collections = await mongoose.connection.db.collections();
        for(let collection of collections){
            await collection.deleteOne({});
        }
    }
}

//Create fake model
const userFakeSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    created_At: {type: Date, default: Date.now},
    updated_At: {type: Date, default: Date.now}
})

const FakeUser = model('FakeUser', userFakeSchema)

export const fakeUserRegistrationData = new FakeUser({
    name: "Buhari",
    email: "buhari@gmail.com",
    password: "nigeria22",
    repeat_password: "nigeria22"
})


