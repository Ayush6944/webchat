import express from 'express';
import userRoutes from './routes/user.js';
import {connectDB} from './utils/features.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import chatRoute from './routes/chat.js';
import { createUser } from './seders/user.js';
// import { createUser } from './seders/user.js';


dotenv.config({ 
    path:'./.env'} 
)
const add=process.env.MONGO_URI

connectDB(add);

// createUser(2); this is the main function for creating user

const port=process.env.PORT || 3000;

const app = express()

// using middleware
app.use(express.json())
app.use(cookieParser())
// connectDB('mongodb://localhost:27017/')


app.use('/user',userRoutes) 
app.use('/chat',chatRoute)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use(errorMiddleware)

app.listen(port,()=>{
    console.log(`server is running on port ${port}` );
})