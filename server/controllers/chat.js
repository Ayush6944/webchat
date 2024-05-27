import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";

const newGropuChat = TryCatch(async(req, res,next) => {

const {name,members} = req.body;

if(members.length < 2)
    return next(
    new ErrorHandler("group chat must be atleast 3 member",
    400)
);

 const allMembers = [...members,req.user];

await Chat.create({
    name,
    gropuChat:true,
    creator:req.user,
    members:allMembers
});


return res.status(201).json({
    success:true,
    message:"group created"
})

});
const getMychats = TryCatch(async(req, res,next) => {

const chats = await Chat.find({members:req.user }).populate
("members","name username avatar");

const transformedChats = chats.map((_id,name,members,groupChat) => {

    const otherMembers = getOtherMember(members,req.user);

    return {
        _id,
        gropuChat,
        avatar:groupChat?members.slice(0,3).
        map((avatar) => avatar.url)
        :[otherMembers.avatar.url],

        name:groupChat?name:otherMembers.name,
        members:members.reduce((prev,curr)=>
        {
            if(curr._id.toString() !== req.user._id.toString())
            prev.push(curr._id);
            return prev;    
        },[]),
    };

});
return res.status(200).json({
    success:true,
    chats:transformedChats
});
});
    
const getMyGroups = TryCatch(async(req, res,next) => {
    
    const chats = await Chat.find({
        members:req.user,
        gropuChat:true,
        creator:req.user
    }).populate("members","name avatar");

    const groups = chats.map((_id,name,members,name)=>({
        _id,groupChat,name,
        avatar:members.slice(0,3).map((avatar) => avatar.url),
    }));
    return res.status(200).json({
        success:true,
        groups
    })
})
const addMembers = TryCatch(async(req, res,next) => {
    
    const {chatId,members} = req.body;
    
    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler("chat not found",404));


    
    
    return res.status(200).json({
        success:true,
        groups
    })
})




export {newGropuChat,getMychats,getMyGroups}