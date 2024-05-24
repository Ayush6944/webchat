import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightblue } from '../../color';
import moment from 'moment';
import { fileformat } from '../../lib/Features';
import RenderAttachment from './RenderAttachment';
const MessageComponent = ({message,user}) => {
    const {sender, content, attachments=[],createdAt} = message;

    const TimeAgo= moment(createdAt).fromNow();
    const samesender= sender?._id === user?._id;
  return (
    <div
    style={{
        alignSelf:samesender?'flex-end':'flex-start',
        backgroundColor:'white',
        color:"black",
        padding:"10px",
        borderRadius:"10px",    
        width:'fit-content',
    }}>
        
        
        {
            !samesender && <Typography
             color={lightblue}
             fontWeight={'bold'}
             variant='caption'

              >{sender.name}</Typography>
        }
        {
            content && <Typography>{content}</Typography>
        }
        {/* attachments showed here */}

        {
            attachments.length>0 && attachments.map((attachment,index)=>{
                

                const url=attachment.url;
                // const type=attachment.type;
                const file =fileformat(url);  //to know the formate of a file 
                
                return(
                    <Box key={index}>
                        <a href={url} target='_blank' download
                        style={{
                            color:'black',
                        }}>
                            {RenderAttachment(file,url)}
                        </a>

                    </Box>
                )
            })
        }


        <Typography  variant='caption'
        color='text.secondary' >{TimeAgo}</Typography>
        </div>
  )
}

export default memo(MessageComponent);