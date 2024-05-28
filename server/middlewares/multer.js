import multer from 'multer';

const multerUpload = multer({
    limits:{
        fileSize:1024*1024 *100
    }
})

const singleAvatar = multerUpload.single('avatar');

const attachments = multerUpload.array('files', 10);

export {multerUpload ,attachments,singleAvatar }// 100mb