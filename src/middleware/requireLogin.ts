import { NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config';
import {User} from '../models/user';
import { JwtPayload, CustomRequest} from '../types/interface';

const requireLogin = (req: CustomRequest, res: Response, next: NextFunction)=>{
    const {authorization} = req.headers;
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,config.JWT_SECRET,(err, payload) => {
        if(err){
         return res.status(401).json({error:"you must be logged in"});
        }
        const { _id } = payload as JwtPayload;
        User.findById(_id).then((userdata)=> {
            req.user = userdata;
            next();
        })
        
        
    })
}

export { requireLogin };