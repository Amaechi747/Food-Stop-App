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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeUserRegistrationData = exports.dropCollections = exports.dbDisconnect = exports.dbConnect = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer = null;
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = yield mongoServer.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    yield mongoose_1.default.connect(uri, mongooseOpts);
});
exports.dbConnect = dbConnect;
const dbDisconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    if (mongoServer) {
        mongoServer.stop();
    }
});
exports.dbDisconnect = dbDisconnect;
const dropCollections = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoServer) {
            const collections = yield mongoose_1.default.connection.db.collections();
            for (let collection of collections) {
                yield collection.deleteOne({});
            }
        }
    });
};
exports.dropCollections = dropCollections;
//Create fake model
const userFakeSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    created_At: { type: Date, default: Date.now },
    updated_At: { type: Date, default: Date.now }
});
const FakeUser = (0, mongoose_1.model)('FakeUser', userFakeSchema);
exports.fakeUserRegistrationData = new FakeUser({
    name: "Buhari",
    email: "buhari@gmail.com",
    password: "nigeria22",
    repeat_password: "nigeria22"
});
//# sourceMappingURL=dbHandler.js.map