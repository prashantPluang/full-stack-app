import express from 'express';
import { app } from './app';
import mongoose from 'mongoose';
import {config } from './config';
import { router as routerPost } from './routes/post';
import { router as routerAuth } from './routes/auth';
import { router as routeUser } from './routes/user';
import cors from 'cors';

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routerAuth);
app.use(routerPost);
app.use(routeUser);


// Database Connection
mongoose.connect(config.URI)
.then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
})

app.listen(8000, () => {
    console.log('server is listening on port 8000....');
    
})