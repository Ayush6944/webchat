import mongoose from "mongoose"
import jwt from 'jsonwebtoken'


const  cookieOptions = {
    maxAge:1000*60*60*24*7, //7days
    sameSite:'none',
    httpOnly:true,
    secure:true
}

const connectDB = (uri)=>{
 mongoose
 .connect(uri,{ dbName:"ChatApp" })
 .then((data)=>console.log(`Connected to DB:  ${data.connection.host}-ChatApp`))
 .catch((err)=>
    {
        throw err;})
}

// const JWT_SECRET = 'sgfhsfdtubalktublak'

const SendTokens = (res,user,code,message)=>{
    const token = jwt.sign({_id:user._id}
        ,process.env.JWT_SECRET)

    return res.status(code).cookie('chattu-token',token,
       cookieOptions
    ).json({
        success:true, 
        message

    })
}

const emitEvent = (req,event,users,data)=>{
    console.log('Emitting event')
}

const deleteFilesFromCloudinary = async (public_ids)=>{

}

export {connectDB,SendTokens,cookieOptions,emitEvent,deleteFilesFromCloudinary} ;