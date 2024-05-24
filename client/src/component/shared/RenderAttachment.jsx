import React from 'react'
import { transformimage } from '../../lib/Features';
import { FileOpen, FileOpenRounded, FileOpenSharp, FilePresent } from '@mui/icons-material';

const RenderAttachment = (file,url) => {
  
    switch (file) {
        case 'video':
           return( <video src={url}  preload='none'
            width={'200px'}
            download
            controls />)
            
        case 'image':
            return <img src={transformimage(url,200)} alt={'image'}
            width={'200px'}
            height={'200px'}      
            style={{
                objectFit: 'contain',
            }}  //heigth and width are optional
            />


        case 'audio':
            return <audio src={url} preload='none' 
             controls />

            
        default:
           return <FileOpenSharp/>
            
        
           
    }

}

export default RenderAttachment