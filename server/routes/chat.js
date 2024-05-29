import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMyGroups, getMychats, leaveGroup, newGropuChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.js';
import { attachments } from '../middlewares/multer.js';


const app = express.Router();


// now after login user can access the further routes

app.use(isAuthenticated);
// here above function is used to authenticate the user 
// for every route below now we can access the user from every route

app.post('/new',newGropuChat)

app.get('/my',getMychats)

app.get('/my/group',getMyGroups)

app.put('/addmembers',addMembers)

app.put('/removemembers',removeMembers)

app.delete("/leave/:id",leaveGroup)

// Send Attachents
app.post("/message",attachments,sendAttachment)
// get messages from other
// app.get('/chat/:id/',A)
// app.put('/chat/:id/',b)
// app.delete('/chat/:id/',c)
// get messages from me
// get chat details , rename, delete
app.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;