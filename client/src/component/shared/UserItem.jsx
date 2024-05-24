import React,{memo} from 'react'
// import {memo} from 
import {ListItem,Stack,Avatar, Typography, IconButton} from '@mui/material'
import { Add, Remove} from '@mui/icons-material'


function UserItem({user,handler,handlerIsLoading,isAdded=false,styling={}}) {
    const {name,_id,avatar}= user;

  return (
    <ListItem>
        <Stack direction={'row'} alignItems={'center'} 
        spacing={'1rem'}
         width={'100%'}
         {...styling}>
            <Avatar src={avatar} alt={name} />
            <Typography variant="body1" color="initial"
            sx={{
                flexGrow:1,
                fontSize:'1rem',
                fontWeight:'bold',
                display:'-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',



            }}
            >{name}</Typography>
            <IconButton size='samll'
            sx={{  
                bgcolor:isAdded?'error.main':'primary.main',
                color:'white',
                '&:hover':{
                    bgcolor:isAdded?"error.dark":'primary.dark',
                },
                borderRadius:'50%',
                p:'0.5rem',
                '&:disabled':{ 
                }

            }}
            onClick={()=>handler(_id)} disabled={handlerIsLoading}>

            {isAdded?<Remove/>:<Add/>}


              
            </IconButton>



        </Stack>
    </ListItem>
    



  )
}

export default  memo(UserItem)