// import { emit } from "nodemon";
import { compare, compareSync } from "bcrypt";
import {User} from "../models/user.js";
import {SendTokens, cookieOptions, emitEvent, uploadtoCloudinary} from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Request} from '../models/request.js';
import { reconstructFieldPath } from "express-validator/lib/field-selection.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import {Chat} from "../models/chat.js";
import {getOtherMember} from "../lib/helper.js"

// create a new user and save it to database and give a response in form of cookie or anytype of message

// login details are stored in database via cookie in web browser
const newUser = TryCatch(async(req,res,next)=>{
    const {name,username,password,bio,email}=req.body;
    const file = req.file;
    console.log("file");

    if(!file) return next(new ErrorHandler("Please Upload Avatar file ",400));


    const result = await uploadtoCloudinary([file]);
    // console.log("yaha tak Ok",result);

    const avatar ={
        public_id:result[0].public_id,
        url:result[0].url,
    };
        const user = await User.create({
            name,
            email,
            bio,
            password,
            username,
            avatar,
    });
    
    SendTokens(res,user,201,'user created successfully');


});

const login = TryCatch(async(req,res,next)=>{
 
    const {username,password}=req.body;


    const user = await User.findOne({ username }).select("+password");
    if(!user) return next(new ErrorHandler("Invalid Username or Password",404));
        
    const isMatch=await compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Passwords",404));
    
    SendTokens(res,user,200,`Welcome Back ${user.name}`); 
});


const getMyProfile = TryCatch(async(req,res)=>{

    const user = await User.findById(req.user);

    res.status(200).json({
        success:true,
        user
    });
}
)
  
const logout = TryCatch(async(req,res)=>{
   return res
   .status(200)
   .cookie("chattu-token",'',
    {...cookieOptions,maxAge:0}
).json({
        success:true,
       message:"Logged Out Succesfully."
    });
}
)

const searchUser = TryCatch(async(req,res)=>{

    const {name} = req.query;
// all user chats
    const myChats = await Chat.find({ groupChat:false , members:req.user});
// all user freinds whom he has communicated already   
    const allUsersFromMyChats = myChats.map((chat)=>chat.members).flat();
// all other users except me and my freinds
    const allUserExceptMeandFreinds= await User.find({
        _id:{$nin:allUsersFromMyChats},
        name:{$regex:name,$options:"i"}

    })
    const users = allUserExceptMeandFreinds.map(({_id,name,avatar})=>({ 
        _id,name,
        avatar:avatar.url,
    }))


    return res
    .status(200)
    .json({
         success:true,
         users
     });
 }
 )
// isme khu ch to joll hai
const sendfreindrequest = TryCatch(async(req,res)=>{
    const {userId} = req.body;

    const request = await Request.findOne({
        $or:[
            { 
                sender:req.user,
                reciver:userId
            },
            {
                sender:userId,
                reciver:req.user
            }
        ],

    });
    if(request) {
        console.log('error in request');
        return next(new ErrorHandler("Request Already Sent",400));
}
    await Request.create({
        sender:req.user,
        reciver:userId
    });

    emitEvent(req,NEW_REQUEST,[userId]);

    return res.status(200).json({
        success:true,
        message:"Freind Request Sent Successfully"
    });


   });
const acceptRequest = TryCatch(async(req,res,next)=>{
    const {requestId,accept} = req.body;

    const request = await Request.findById(requestId)
    .populate("sender","name").populate("reciver","name");

    if(!request) return next(new ErrorHandler("Invalid Request or not found",400));

    if(request.reciver._id.toString()!==req.user.toString()) 
        return next(new ErrorHandler("unauthorized request found",401)
    )
    if(!accept) {
        await request.deleteOne();
        return res.status(200).json({
            success:true,
            message:"Request Rejected Successfully"
        });
    }

    const members = [ request.sender._id,request.reciver._id];
    await Promise.all([chat.create({members,
        name:`${request.sender.name} & ${request.reciver.name}`,
    }),
    request.deleteOne(),
]);

    emitEvent(req,REFETCH_CHATS,members);

    return res.status(200).json({
        success:true,
        message:"Request Accepted Successfully",
        sender:request.sender._id
    })
})

const getallNotification = TryCatch(async(req,res)=>{

    const requests  = await Request.find({ reciver:req.user})
    .populate("sender","name avatar");

    const allRequests = requests.map(({_id,sender})=>({
        _id:sender._id,
        name:sender.name,
        avatar:sender.avatar.url  
    }))
    return res.status(200).json({
        success:true,
        allRequests 
    })


})

const getmyfreinds = TryCatch(async(req,res)=>{
    const chatId = req.query.chatId;

    const chats = await Chat.find({members:req.user,
        groupChat:false,
    }).populate("members","name avatar");

    const friends = chats.map(({members})=>{
        const otherUser = getOtherMember(members,req.user)
        return {
            _id:otherUser._id,
            name:otherUser.name,
            avatar:otherUser.avatar.url
        }
    })
    if(chatId){
        const chat = await Chat.findById(chatId);

        const availableFriends = friends.filter(({friends})=>!chat.members.includes(friends._id));

        return res.status(200).json({
            success:true,
            friends : availableFriends
        })
     }
    else{
    return res.status(200).json({
        success:true,
        friends
    })
 }

})





export {newUser,login,getMyProfile
    ,logout,searchUser,sendfreindrequest
    ,acceptRequest,getallNotification
    ,getmyfreinds

};