import { Request, Response } from 'express';
import {User} from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config';

const register = (req: Request, res: Response) => {
    const {name,email,password, pic} = req.body; 
    if(!email || !password || !name){
       return res.status(422).json({error:"please add all the fields"});
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
          return res.status(422).json({error:"user already exists with that email"});
        }
        bcrypt.hash(password,12)
        .then((hashedpassword: string) => {
              const user = new User({
                  email,
                  password:hashedpassword,
                  name,
                  pic
              })
      
              user.save()
              .then((user) => {
                  res.json({message:"saved successfully", user});
              })
              .catch((err: Error) => {
                  console.log(err);
                  return res.json({message: err});
              })
        })
       
    })
    .catch((err) => {
      console.log(err);
      return res.json({message: err});
    })
  }

  const login = (req: Request, res: Response) => {
    const {email,password} = req.body;
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"});
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then((doMatch: boolean) => {
            if(doMatch){
               const token = jwt.sign({_id:savedUser._id},config.JWT_SECRET, {expiresIn: "7d"});
               const {_id,name,email,pic} = savedUser;
               res.json({token,user:{_id,name,email,pic}});
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"});
            }
        })
        .catch((err: Error) => {
            console.log(err);
            return res.json({error: err});
        })
    })
}
  export { register, login };