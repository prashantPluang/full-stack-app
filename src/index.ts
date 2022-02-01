import express, { Application } from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { router as routerAuth } from './routes/auth';
import { router as routerUser } from './routes/user';
import { router as routerPost } from './routes/post';
const app: Application = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routerAuth);
app.use(routerUser);
app.use(routerPost);

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