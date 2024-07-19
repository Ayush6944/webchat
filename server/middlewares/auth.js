import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";


const isAuthenticated =  TryCatch((req, res, next) => {
    
   const tokens =  req.cookies['chattu-token'];

   if(!tokens) return next(new ErrorHandler('Please Login First ! ',401));
    
   //verify token
   const decodeData = jwt.verify(tokens, process.env.JWT_SECRET);
     
   req.user = decodeData._id;
   next()
});
const isAdminOnly = (req, res, next) => {
    
   const tokens =  req.cookies['app-admin-token'];

   if(!tokens) return next(new ErrorHandler('Only Admin can access ! ',401));
    
   //verify token
   const secretKey = jwt.verify(tokens, process.env.JWT_SECRET);

   const adminSecretkey =  process.env.ADMIN_SECRET_KEY ; //isko app.js me dal kar export kar sakte hai for security reasons
     
   const isMatched = secretKey === adminSecretkey;

   if(!isMatched) 
      return next(new ErrorHandler('Only Admin can access ! ',401));

   next()
}

export { isAuthenticated ,isAdminOnly};
  