import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import {User} from "../models/user.js";
import {Message} from "../models/message.js";
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

    const groups = chats.map((_id,name,members)=>({
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

    const {chatId} = req.body;
    const [chat, me ] = await Promise .all([Chat.findById(chatId),
        User.findById(req.user,"name")
    ])
    
    if(!chat) return next(new ErrorHandler("chat not found",404));          
    
    const files = req.files || [];

    if(files.length < 0) 
        return next(new ErrorHandler("No files uploaded , Please upload a file",400));

    // uploads files here

    const attachments = [];
    
    const messageForDB = {
        content :"",
        attachments:[],
        sender:me._id,
        chat:chatId,
    }
    const messageForRealTime = {
       ...messageForDB,
        sender:{
            _id:me._id,
            name:me.name,
        },
       
    };
    const message = await Message.create(messageForDB);

    emitEvent(req,
        NEW_MESSAGE_ALERT,
        chat.members,
        {messageForRealTime,
            chatId,
        });
        emitEvent(req,
         NEW_MESSAGE_ALERT,chat.members ,{chatId}
        );

    return res.status(200).json({
        success:true,
        message, })
})

const getChatDetails = TryCatch(async(req,res,next) => {
    if(req.query.populate==='true'){
        const chat = await Chat.findById(req.params.id)
        .populate("members","name avatar")
        .lean();
        if(!chat) return next(new ErrorHandler("chat not found",404));
        chat.members = chat.members.map((_id,name,avatar)=>      
            ({
                _id,
                name,
                avatar:avatar.url,
            }));

        return res.status(200).json({
            success:true,
            chat
        })
    }else{
        const chat = await Chat.findById(req.params.id);
        if(!chat) 
        return next(new ErrorHandler("chat not found",404));

        return res.status(200).json({
            success:true,
            chat
        })

    }
})

const renameGroup = TryCatch(async(req,res,next) => {
    const chatId = req.params.id;
    const {name} = req.body;

    const chat = await Chat.findById(chatId);
    if(!chat) return next(new ErrorHandler("chat not found",404));
    if(!chat.groupChat) 
        return next(new ErrorHandler("This is not a group chat",400));

    if (chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("You are not allowed to do this",403));

    chat.name = name;

    await chat.save(); 

    emitEvent(req,
        REFETCH_CHATS,
        chat.members,
        );

    return res.status(200).json({
        success:true,
        message:`group name changed succesfull to ${name}`
    })



})

const deleteChat = TryCatch(async(req,res,next) => {
    
})

export {newGropuChat,
    getMychats,getMyGroups,addMembers,removeMembers,
    leaveGroup,sendAttachment,
    getChatDetails
    ,renameGroup
    ,deleteChat

}