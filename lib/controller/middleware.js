"use strict";
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
exports.isAuthorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthorized = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        if (req.cookies.token) {
            try {
                token = req.cookies.token;
                // Verify Token
                if (process.env.JWT_SECRET) {
                    const verified = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                    if (verified) {
                        next();
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(401);
                throw new Error('Not authorized');
            }
        }
        else if (((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer')))) {
            try {
                token = req.headers.authorization.split(' ')[1];
                // Verify Token
                if (process.env.JWT_SECRET) {
                    const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                    if (verified) {
                        next();
                    }
                }
            }
            catch (error) {
                res.status(401);
                throw new Error('Not authorized');
            }
        }
        if (!token) {
            res.status(401);
            res.redirect('/users/login');
            // throw new Error('Not authorized, no token')
        }
    });
};
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=middleware.js.map