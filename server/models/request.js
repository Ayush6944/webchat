import {mongoose, Schema,Types,model } from "mongoose";

const schema = new Schema({
   status:{
       type:String,
       default:"pending",
       enum:["pending","accepted","rejected"]
       
   },
    sender:{
        type:Types.ObjectId,
        required:true,
        ref:"User"
    },
    reciver:{
        type:Types.ObjectId,
        required:true,
        ref:"User"
    },

},{
    timestamps:true
});

export const Request = mongoose.models.Request || model("Request",schema);
