import express from 'express';
import { acceptRequest, getallNotification, getmyfreinds, getMyProfile, login, logout, newUser, searchUser, sendfreindrequest } from '../controllers/user.js';
import {multerUpload }  from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { acceptrequestValidator, loginValidator, registerValidator, sendrequestValidator, validateHandle } from '../lib/Validator.js';


const app = express.Router();

app.post('/new',multerUpload.single('avatar'),registerValidator(),validateHandle,newUser); 
app.post('/login',loginValidator(),validateHandle,login);

// now after login user can access the further routes

app.use(isAuthenticated);
// here above function is used to authenticate the user 
// for every route below now we can access the user from every route
app.get('/myprofile',getMyProfile)

app.get('/logout',logout)

app.get('/search',searchUser )

app.put('/sendrequest',sendrequestValidator(),validateHandle,sendfreindrequest)

app.put('/acceptrequest',acceptrequestValidator(),validateHandle,acceptRequest)

app.get('/notifications',getallNotification)

app.get('/friends',getmyfreinds)

export default app; 