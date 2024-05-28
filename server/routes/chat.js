import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, getMyGroups, getMychats, leaveGroup, newGropuChat, removeMembers } from '../controllers/chat.js';


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



export default app;