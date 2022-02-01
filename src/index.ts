import express, { Application } from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { router as routerAuth } from './routes/auth';
const app: Application = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routerAuth);

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