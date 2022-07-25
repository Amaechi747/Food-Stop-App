import express, {Request, Response, NextFunction} from 'express'
import {registerPage, loginPage, registerUser, loginUser, logoutUser} from '../controller/api'
import {getRecipesByPagination} from '../controller/recipeApi';
import { isAuthorized } from '../controller/middleware';
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req: Request, res: Response, next: NextFunction) {
//   res.send('respond with a resource');
// });


router.get('/register', registerPage);
router.get('/login', loginPage);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/:id',isAuthorized, getRecipesByPagination)
// router.get('/:id', isAuthorized, isAuthorized)
export default router;
