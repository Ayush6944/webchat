import express from 'express';
import { getMyProfile, login, logout, newUser, searchUser } from '../controllers/user.js';
import multerUpload from '../middlewares/multer.js';
import { isAuthenticated } from '../middlewares/auth.js';


const app = express.Router();

app.post('/new',multerUpload.single('avatar'),newUser);
app.post('/login',login);

// now after login user can access the further routes

app.use(isAuthenticated);
// here above function is used to authenticate the user 
// for every route below now we can access the user from every route
app.get('/myprofile',getMyProfile)
app.get('/logout',logout)
app.get('/search',searchUser )
export default app;