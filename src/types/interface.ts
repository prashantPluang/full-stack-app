import { Request } from 'express';
import {Document} from 'mongoose';

export interface JwtPayload {
    _id: string;
}

export interface userInterface extends Document{
    name: string,
    email: string,
    password: string,
    pic: string
}

export interface customRequest extends Request {
    user? : (userInterface & {
        _id: string;
    }) | null
}