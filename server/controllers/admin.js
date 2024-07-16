import jwt from "jsonwebtoken";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import {User} from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";

// const adminLogin = TryCatch(async (req, res,next) => {
    
//     const { secretKey } = req.body;
   
//     const adminSecretkey =  process.env.ADMIN_SECRET_KEY ;

//     const isMatch = secretKey === adminSecretkey;

//     // if(!secretkey) return next(new ErrorHandler("Please Provide Secret Key",400));

//     if(!isMatch) return next(new ErrorHandler("Invalid Secret Key",401));

//     const token = jwt.sign(secretKey,process.env.JWT_SECRET);

//     return res.status(200).
//     cookie("chatapp admin token",token
//         ,{...cookieOptions
//         ,maxAge:1000*60*45}).json({
//         success:true, 
//         message:"Authenticated Successfull,Welcome Ayush Ji",
//         // token,
//     });

// })

const adminLogin = TryCatch(async (req, res, next) => {
    console.log("admin login");
    const { secretKey } = req.body;
    if (!secretKey) console.log("not found key");
       
    const adminSecretkey =  process.env.ADMIN_SECRET_KEY ;
  
    const isMatched = secretKey === adminSecretkey;
  
    if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401));
  
    const token = jwt.sign(secretKey, process.env.JWT_SECRET);
  
    return res
      .status(200)
      .cookie("app-admin-token", token, 
        {...cookieOptions,
        maxAge: 1000 * 60 * 15,
      })
      .json({
        success: true,
        message: "Authenticated Successfully, Welcome ayush ",
      });
  })

const adminLogout = TryCatch(async (req, res, next) => {
    


    return res
      .status(200)
      .cookie("app-admin-token","", 
        {...cookieOptions,
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Logut Successfully, bye bye ayush ",
      });
  })

const getAdminData = TryCatch(async (req, res,next) => {
    return res.status(200).json({
        admin:true,        
    })
})

const allUsers = TryCatch(async (req, res) => {

    const users = await User.find({});

    const transformedUsers = await Promise.all(
    users.map(async(name,username,avatar,_id)=>{


        const [groups,friends] = await Promise.all([
            Chat.countDocuments({groupChat:true , members:_id}),
            Chat.countDocuments({groupChat:false , members:_id}),
        ])

        return {
            name,
            username,
            avatar:avatar.url,
            _id,
            groups,
            friends,
        }
    }));

    return res.status(200).json({
        status:"success",
        users,
    })

     
});

const allChats = TryCatch(async (req, res) => {
    const chats = await Chat.find({})
    .populate("members" , "name avatar")
    .populate("creator" , "name avatar");


    const transformedChats = await Promise.all(chats.map(async (
        members, _id,groupChat,name,creator)=>{

            const totalMessages = await Message.countDocuments({chat:_id});
            
        return {
            _id,
            groupChat,
            name,
            avatar:members.slice(0,3).map((member)=>member.avatar.url),
            members:members.map(({_id,name,avatar})=>(
                {
                    _id,
                    name,
                    avatar:avatar.url,
                })
            ),
            creator:{
                name:creator?.name || "None",
                avatar:creator?.avatar.url || "None",
            },
            totalMessages,
          

    }  }));

    return res.status(200).json({
        status:"success",
        chats,
    })

});

const allMessages = TryCatch(async (req, res) => {
    const messages = await Message.find({})
    .populate("sender","name avatar")
    .populate("chat", "groupChat");

    const transformedMessages = (messages.map(({content,attachments,sender,chat, _id, createdAt})=>({
        _id,attachments,content,
        createdAt,
        chat:chat_id,
        groupChat:chat.groupChat,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url,

        }

    })))

    return res.status(200).json({
        status:"success",
        messages:transformedMessages,   
    })
    
})

const getDashboard = TryCatch(async (req, res) => {
    
    const [groupChats,userCount,messagesCount, chatCount] = await Promise.all([
      Chat.countDocuments({groupChat:"true"}),  
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

    const today = new Date();

    const last7day =  new Date();
    last7day.setDate(last7day.getDate() - 7);

    const last7daysMessages = await MessageChannel.find({
        createdAt:{
            $gte:last7day,
            $lt:today,
        }
    }).select("createdAt");

    const messages = new Array(7).fill(0);
// 5.40.18

    last7daysMessages.forEach((messages)=>{   
    const indexApprox = 
    (today.getTime() - messages.createdAt.getTime() ) / 
    (1000*60*60*24) ;
 
    const index = Math.floor(indexApprox);
    messages[6-index]++;
});
    const stats={
        groupChats,
        userCount,
        messagesCount,
        chatCount,
        messagesChart : messages
    }

    return res.status(200).json({
        status:"success",
        stats
    })
})




export {allUsers,allChats,allMessages,getDashboard,
    
    adminLogin,adminLogout,getAdminData }