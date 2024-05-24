// import { emit } from "nodemon";
import { compare } from "bcrypt";
import {User} from "../models/user.js";
import {SendTokens, cookieOptions} from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// create a new user and save it to database and give a response in form of cookie or anytype of message

// login details are stored in database via cookie in web browser
const newUser = async(req,res)=>{

    const {name,username,password,bio}=req.body;
    const avatar={
        public_id:"12789",
        url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }

        const user = await User.create({
            name,
            bio,
            password,
            username,
            avatar,
    });
    
    SendTokens(res,user,201,'user created sucgfcessfully');

}

const login = TryCatch(async(req,res,next)=>{
 
    const {username,password}=req.body;

    const user =await User.findOne({username}).select("+password");
    if(!user) return next(new ErrorHandler("Invalid Username or Password",404));
        
    const isMatch=await compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Password",404));
    
    SendTokens(res,user,200,`Welcome Back ${user.name}`);
});


const getMyProfile = TryCatch(async(req,res)=>{

    const user = await User.findById(req.user);

    res.status(200).json({
        success:true,
        user
    });
}
)

const logout = TryCatch(async(req,res)=>{
   return res
   .status(200)
   .cookie("chattu-token",'',
    {...cookieOptions,maxAge:0}
).json({
        success:true,
       message:"Logged Out Succesfully"
    });
}
)

const searchUser = TryCatch(async(req,res)=>{

    const {name} = req.query;
    return res
    .status(200)
    .json({
         success:true,
        message:name
     });
 }
 )

export {newUser,login,getMyProfile,logout,searchUser}