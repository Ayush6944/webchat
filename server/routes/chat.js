import express from 'express';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyGroups, getMychats, leaveGroup, newGropuChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.js';
import { addmembersValidator,renameValidator, chatidValidator, getMessageValidator, newGroupValidator, removeMembersValidator, sendAttachmentsValidator, validateHandle } from '../lib/Validator.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attachments } from '../middlewares/multer.js';


const app = express.Router();


// now after login user can access the further routes

app.use(isAuthenticated);
// here above function is used to authenticate the user 
// for every route below now we can access the user from every route

app.post('/new',newGroupValidator(),validateHandle,newGropuChat)

app.get('/my',getMychats)

app.get('/my/group',getMyGroups)

app.put('/addmembers',addmembersValidator(),validateHandle,addMembers)

app.put('/removemembers',removeMembersValidator(),validateHandle,removeMembers)

app.delete("/leave/:id",chatidValidator(),validateHandle,leaveGroup)

// Send Attachents
app.post("/message",attachments,sendAttachmentsValidator(),validateHandle,sendAttachment)

// get messages from other
app.get("/messages/:id",getMessageValidator(),validateHandle,getMessages )

// get messages from other
// app.get('/chat/:id/',A)
// app.put('/chat/:id/',b)
// app.delete('/chat/:id/',c)
// get messages from me
// get chat details , rename, delete
app.route('/:id').
get(getMessageValidator(),validateHandle,getChatDetails)
.put(renameValidator(),validateHandle,renameGroup)
.delete(chatidValidator,validateHandle,deleteChat);

export default app;