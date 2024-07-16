import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {
    
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
// duplicate information for two different users
    if(err.code===11000){
        err.message =  Object.values(err.keyValue).join(",")
         + " - user already exists , enter different credentials";
        err.statusCode =  400;
        // err.message = `Duplicate field ${error}`
    }
    if(err.name === "CastError"){
        err.message = `Invalid formate  ${err.path}: ${err.value}`;
        err.statusCode = 400;
    }

    return res.status(err.statusCode).json({
        success: false,
        message: envMode ==="development"? err : err.message ,
    });
};

const TryCatch=(passedfunction) => async(req,res,next)=>{

    try{
        await passedfunction(req,res,next)
    }catch(err){
        next(err)
    }
};



export {errorMiddleware,TryCatch}