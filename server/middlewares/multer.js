import multer from 'multer';

const multerUpload = multer({
    limits:{
        fileSize:1024*1024 *10
    }
})

export default multerUpload;// 10mb