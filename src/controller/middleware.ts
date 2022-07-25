import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const isAuthorized = async function(req: Request, res: Response, next: NextFunction){
    let token;
    if(req.cookies.token){
        try{
            token = req.cookies.token; 
            // Verify Token
            if (process.env.JWT_SECRET){
                const verified = await jwt.verify(token, process.env.JWT_SECRET);
                if(verified){
                    next(); 
                }
            }
                    
        }catch(error){
            console.log(error)
            res.status(401);
            throw new Error('Not authorized');
        }
    }else if(((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer'))) ){
        try{
            token = req.headers.authorization.split(' ')[1] 

            // Verify Token
            if (process.env.JWT_SECRET){
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                if(verified){
                    next(); 
                }
            }
                    
        }catch(error){
            res.status(401);
            throw new Error('Not authorized');
        }
    }
    if(!token){
        res.status(401);
        res.redirect('/users/login')
        // throw new Error('Not authorized, no token')
    }

}