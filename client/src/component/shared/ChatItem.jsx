import React,{memo} from 'react'
import { Link } from '../styles/StyleComponents'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import AvatarCard from './AvatarCard'
import AvatarCard from './AavtarCard'
// import memo from '../utils/memo'
const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    isOnline,
    sameSender,
    newMessageAlert,
    index=0,
    handleDeleteChat,

}) => {
  return(
  <Link
  sx={{
    padding:'0',}}
  to={`/chat/${_id}`}
   onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
    <div
    style={
        {
            display:'flex',
            alignItems:'center',
            gap:'1rem',
            padding:'1rem', 
            backgroundColor:sameSender?'grey':'unset',
            // plese consider here if user chat icon is different from the video provider
            color:sameSender?"black":"unset",
            position:'relative',

    }}>
{/* avvtar icon */}
<AvatarCard avatar={avatar} />
    <Stack>
        <Typography>
            {name}
        </Typography>
        {newMessageAlert &&(
                <Typography>{newMessageAlert.count} New Message</Typography>
            )}
    </Stack>

        {
            isOnline&& <Box sx=
            {{
                width:'1rem',
                height:'1rem',
                borderRadius:'50%',
                backgroundColor:'#4caf50',
                position:'absolute',
                right:'1rem',
                top:'1rem',
                transform:"translate(-50%)"


            }}/>

        }


    </div>
  </Link>

)}

export default memo(ChatItem);