import express, { Application } from 'express';
import { router as routerPost } from './routes/post';
import { router as routerAuth } from './routes/auth';
import { router as routeUser } from './routes/user';


const app: Application = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routerAuth);
app.use(routerPost);
app.use(routeUser);

export { app };