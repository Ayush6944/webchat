import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat} from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/event.js";

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
emitEvent(req,ALERT,allMembers,`Welcome to ${name} group`);
emitEvent(req,REFETCH_CHATS,members);

return res.status(201).json({
    success:true,
    message:"group created"
})

});
    



export {newGropuChat}