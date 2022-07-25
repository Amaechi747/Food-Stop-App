"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("../controller/api");
const recipeApi_1 = require("../controller/recipeApi");
const middleware_1 = require("../controller/middleware");
const router = express_1.default.Router();
/* GET users listing. */
// router.get('/', function(req: Request, res: Response, next: NextFunction) {
//   res.send('respond with a resource');
// });
router.get('/register', api_1.registerPage);
router.get('/login', api_1.loginPage);
router.post('/register', api_1.registerUser);
router.post('/login', api_1.loginUser);
router.get('/logout', api_1.logoutUser);
router.get('/:id', middleware_1.isAuthorized, recipeApi_1.getRecipesByPagination);
// router.get('/:id', isAuthorized, isAuthorized)
exports.default = router;
//# sourceMappingURL=users.js.map