import { body, param, validationResult } from 'express-validator';
import { ErrorHandler } from '../utils/utility.js';

// const validateHandle = (req,res,next)=>{
//     const  errors = validationResult(req);
    
//     const errorMessages = errors.array()
//     .map((error)=>error.msg)
//     .join(", "); 
    
//     if(errors.isEmpty()){
//         console.log('errors are empty');
//         return next(new ErrorHandler(errorMessages,400));
//     }
//     else next(new ErrorHandler(errorMessages,400));

// }; 

const validateHandle = (req, res, next) => {
    const errors = validationResult(req);
  
    const errorMessages = 
      errors.array()
      .map((error) => error.msg)
      .join(", ");
  
      if(errors.isEmpty()){
        // console.log(errors);
        return next();  // 1 hour to fix this 
      }
    else next(new ErrorHandler(errorMessages,400));
  }

const registerValidator = () => [
    body("name","Please Enter Name").notEmpty(), 
    body("username","Please Enter UserName").notEmpty(), 
    body("bio","Please Enter Bio").notEmpty(), 
    body("password","Please Enter Password").notEmpty(), 
    // check("avatar","Please Upload Avatar").notEmpty(),
];
// 4.10.47
const loginValidator = () => [ 
    body("username","Please Enter UserName").notEmpty(), 
    body("password","Please Enter Password").notEmpty(), 
];

const newGroupValidator = () => [
    body("name","Please Enter Name").notEmpty(), 
    body("members")
    .notEmpty()
    .withMessage("please Add members between 2-100")
    .isArray({min:2,max:100})
    .withMessage("please Add atleast more than 2 members"), 
];

const addmembersValidator = () => [
    body("chatId","Please Enter ChatId").notEmpty(), 
    body("members")
    .notEmpty()
    .withMessage("please Add members between 1-97")
    .isArray({min:1,max:97})
    .withMessage("members should be between 1-97"), 
];
const removeMembersValidator = () => [
    body("chatId","Please Enter ChatId").notEmpty(), 
    body("members")
    .notEmpty()
    .withMessage("please provide member id ")
    .isArray({min:1,max:97})
    .withMessage("members should be between 1-97"), 
];
const chatidValidator = () => [
    param("id","Please Enter ChatId").notEmpty(),

];
const sendAttachmentsValidator = () => [
    body("chatId","Please Enter ChatId").notEmpty(),
    // check("files","Please Upload Files")
    // .notEmpty()
    // .isArray({min:1,max:5})
    // .withMessage("files should be between 1-5"),
];

const getMessageValidator = () => [
    param("id","Please Enter Chat Id").notEmpty(),
];
const renameValidator = () => [
    param("id","Please Enter Chat Id").notEmpty(),
    body("name","Please Enter new name").notEmpty(),
];
const sendrequestValidator = () => [
    // param("id","Please Enter Chat Id").notEmpty(),
    body("userId","Please Enter user id").notEmpty(),
];
const acceptrequestValidator = () => [
    // param("id","Please Enter Chat Id").notEmpty(),
    body("requestId","Please Enter request id").notEmpty(),
    body("accept","Please Enter accept or reject").notEmpty().isBoolean().withMessage("accept must be a boolean"),

];

const adminLoginValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty(),
  ];

const adminLogoutValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty()];


export { acceptrequestValidator, addmembersValidator, adminLoginValidator, chatidValidator, getMessageValidator, loginValidator, newGroupValidator, registerValidator, removeMembersValidator, renameValidator, sendAttachmentsValidator, sendrequestValidator, validateHandle };
