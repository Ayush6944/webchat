import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary"
import {v4 as uuid} from 'uuid'
import { getBase64 } from "../lib/helper.js"

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

const uploadtoCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

// const uploadtoCloudinary = async (files = []) => {
//   try {
//     const uploadPromises = files.map((file) => {
//       return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(
//           getBase64(file), // Use file path directly for upload
//           {
//             // folder: 'avatars/', // Optional folder name in Cloudinary
//             public_id: uuid(), // Generate a unique public_id
//             resource_type: "auto" // Automatically determine the resource type
//           },
//           (error, result) => {
//             if (error) {
//               console.log(error);
//               reject(error);
//             } else {
//               resolve(result);
//             }
//           }
//         );
//       });
//     });

//     const results = await Promise.all(uploadPromises);

//     // Map results to formattedResults containing public_id and url
//     const formattedResults = results.map((result) => ({
//       public_id: result.public_id,
//       url: result.secure_url,
//     }));

//     return formattedResults;
//   } catch (err) {
//     throw new Error("Error uploading files to Cloudinary", err);
//   }
// };

const deleteFilesFromCloudinary = async (public_ids)=>{

  
}


export {connectDB,SendTokens,
    cookieOptions
    ,emitEvent
    ,uploadtoCloudinary,
    deleteFilesFromCloudinary} ;
