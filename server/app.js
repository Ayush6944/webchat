import express from 'express';
import {connectDB} from './utils/features.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
// import { createUser } from './seders/user.js';
import { Server } from 'socket.io';
import {createServer }from 'http';
import {v4 as uuid} from 'uuid';
import adminRoutes from './routes/admin.js';
import chatRoute from './routes/chat.js';
import userRoutes from './routes/user.js';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/event.js';
import { getSockets } from './lib/helper.js';
import { Message } from './models/message.js';
import {v2} from 'cloudinary';
import cors from 'cors';
// import clo
dotenv.config({ 
    path:'./.env'} 
)
// database address  
const add=process.env.MONGO_URI

connectDB(add);
// console.log(process.env.NODE_ENV);
// createUser(2); this is the main function for creating user

// cloudinary config 35.45

v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const port=process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim()|| "development";

const app = express()

const server = createServer(app);
const io = new Server(server,{});

const userSocketIds = new Map();


// using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:['http://localhost:5173', 'http://localhost:4173'],
    credentials:true
}));


app.use('/api/v1/user',userRoutes) 
app.use('/api/v1/chat',chatRoute)

// admin routes
app.use('/api/v1/admin',adminRoutes)

app.get('/',(req,res)=>{
    res.send("LOADING SERVER ......") 
})
// establishing socket connection

io.on('connection', (socket) => {

    // temp user

    const user = {
        _id:"669575d1aefe1dcd6kjmmdfc11521",
        name:"user111"

    }
    userSocketIds.set(user._id.toString(),socket.id);

    console.log('a user connected', socket.id);

    socket.on(NEW_MESSAGE, async({chatId,members,message})=>{

        const messageForRealTime = { 
            content:message,
            _id:uuid(),
            sender:{
                _id:user._id,
                name:user.name
            },
            chatId:chatId,
            createdAt:new Date().toISOString(),
        };
        const messageForDB ={
            content:message,
            sender:user,
            chatId:chatId,
        };

        const membersSocket = getSockets(members);
        // console.log("MEMBERS SOCKET",membersSocket); 

        io.to(membersSocket).emit(NEW_MESSAGE,{
            chatId,
            message:messageForRealTime,
        });

        io.to(membersSocket).emit(NEW_MESSAGE_ALERT,{chatId});


        try{
        await Message.create(messageForDB);}
        catch(err){
            
            console.log(err);
        }
        console.log("NEW MESSAGES" , messageForRealTime);
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
      userSocketIds.delete(user._id.toString());
    });
})




app.use(errorMiddleware)
// here we will not write app.listen because we are using socket.io
server.listen(port,()=>{
    console.log(`server is running on port localhost:${port}  in ${envMode} mode` );
})

export {
    envMode,userSocketIds
}