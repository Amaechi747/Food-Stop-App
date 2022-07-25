"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authenticateUser = exports.saveUserData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    created_At: { type: Date, default: Date.now },
    updated_At: { type: Date, default: Date.now }
});
const User = mongoose_1.default.model('User', userSchema);
const saveUserData = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = data;
            //Check database for uniqueness
            // const isRegistered = await User.findOne({email})
            // if(isRegistered instanceof Object){
            //     throw new Error('User already exists');
            // }
            // Hash Password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            //Get date 
            const createdAt = new Date().toISOString();
            const updatedAt = new Date().toISOString();
            //Create user and save
            const newUser = new User({ name, email, password: hashedPassword, created_At: createdAt, updated_At: updatedAt });
            const isSaved = yield newUser.save();
            if (isSaved) {
                return data;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
};
exports.saveUserData = saveUserData;
const authenticateUser = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = data;
            const isRegistered = yield User.findOne({ email });
            if (isRegistered && (yield bcryptjs_1.default.compare(password, isRegistered.password))) {
                return isRegistered;
            }
            else {
                throw new Error('Invalid email or Password');
            }
        }
        catch (error) {
            // const {message} = error.details[0];
            console.log(error);
            throw Error(error);
        }
    });
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=userMongooseSchema.js.map