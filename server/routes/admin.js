import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboard } from '../controllers/admin.js';
import { adminLoginValidator, validateHandle } from '../lib/Validator.js';
import { isAdminOnly } from '../middlewares/auth.js';

const app = express.Router();

// admin authentication
app.post("/verify",adminLoginValidator() , validateHandle , adminLogin)

app.get("/logout",adminLogout)

// only admin can access these routes

app.use(isAdminOnly,getAdminData)

app.get('/')
app.get("/users",allUsers)
app.get("/chats",allChats)
app.get("/messages",allMessages)
app.get("/stats",getDashboard)  

export default app;