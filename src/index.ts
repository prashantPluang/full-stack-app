import { app } from './app';
import mongoose from 'mongoose';

// Database Connection
mongoose.connect(process.env.DB as string)
.then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
})

app.listen(8000, () => {
    console.log('server is listening on port 8000....');
    
})