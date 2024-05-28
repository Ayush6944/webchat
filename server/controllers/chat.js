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
    if(!chat.groupChat) return next(new ErrorHandler("No Group Chat found",404));

    if(chat.creator.toString() !== req.user._id.toString())
        return next(new ErrorHandler("You are not allowed to add members",403));

    const allNewMemberPromise = members.map((i)=>UserActivation.findById(i,"name"));
    
    const allNewMember = await Promise.all(allNewMemberPromise);
    
    const uniqueMembers = allNewMember.filter((i)=>!chat.members.includes(i._id.toString())).map((i)=>i._id);

    chat.members.push(...uniqueMembers);

    if(chat.members.length > 100) return next(new ErrorHandler("You can add only 100 members",403));
    await chat.save();

    const allUserName = allNewMember.map((i)=>i.name).join(",");
    
    emitEvent(
        req,
        ALERT,
        chat.members,
        `You have been added to ${chat.name} by ${req.user.name}`
    )

    return res.status(200).json({
        success:true,
        message:`${allUserName} have been added to ${chat.name}`
    }
    )

    return res.status(200).json({
        success:true,
        groups
    })
})
const removeMembers = TryCatch(async(req, res,next) => {
    
    const {chatId,userId} = req.body;
    
    const [chat , userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId,"name"),
    ]);
    if(!chat) return next(new ErrorHandler("chat not found",404));
    if(!chat.groupChat) return next(new ErrorHandler("No Group Chat found",404));
    
    if(chat.creator.toString() !== req.user._id.toString())
        return next(new ErrorHandler("You are not allowed to add members",403));

    if(chat.members.length <= 3) return next(new ErrorHandler("You can not remove more members",403));

    chat.members = chat.members.filter((members)=>members.toString() !== userId.toString());

    await chat.save();

    emitEvent(
        req,    
        ALERT,
        chat.members,
        `${userThatWillBeRemoved.name} has been removed  by admin `
    );
    emitEvent(req,REFETCH_CHATS , chat.members);

    return res.status(200).json({
        success:true,
        message:`${userThatWillBeRemoved.name} has been removed  by admin `
    })

})
const leaveGroup = TryCatch(async(req, res,next) => {
    
    const chatId = req.params.id;
    
    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler("chat not found",404));
   
    if(!chat.groupChat) return next(new ErrorHandler("No Group Chat found",404));

    const remainingMembers = chat.members.filter((members)=>members.toString() !== req.user.toString());

    if(remainingMembers.length <= 2) 
        return next(new ErrorHandler
    ("You can not leave the group",403));
   
    if(chat.creator.toString() == req.user.toString()){
        const newCreator = remainingMembers[0];//here if the admin will leave the group then the first member will be the new admin
        chat.creator = newCreator;
    }

    chat.members= remainingMembers;
    // if error founded here ..
    const [user]= await Promise.all ([User.findById(req.user,"name")
    ,chat.save()]);
    emitEvent(
        req,    
        ALERT,
        chat.members,
        `User ${user.name} has been removed  by admin `
    );
    emitEvent(req,
        REFETCH_CHATS , 
        chat.members);

    return res.status(200).json({
        success:true,
        message:`${userThatWillBeRemoved.name} has been removed  by admin `
    })

})

const sendAttachment = TryCatch(async(req,res,next) => {
    return res.status(200).json({
        success:true,
        message:"Attachment sent successfully"
    })
})


export {newGropuChat,getMychats,getMyGroups,addMembers,removeMembers,leaveGroup,sendAttachment}