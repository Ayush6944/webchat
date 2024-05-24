import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";


const isAuthenticated = (req, res, next) => {
    
   const tokens =  req.cookies['chattu-token'];

   if(!tokens) return next(new ErrorHandler('Please Login First ! ',401));
    
   //verify token
   const decodeData = jwt.verify(tokens, process.env.JWT_SECRET);
     
   req.user = decodeData._id;

//    console.log(req.user)

   next()
}

export { isAuthenticated };
