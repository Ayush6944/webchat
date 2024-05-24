import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotification } from '../../sampleDATA/sample'
function Notification() {
  const freindrequesthander = (_id,accept) => {
     
  }
  return (
    <Dialog open>
      <Stack p={{xs:'1rem',sm:'2rem',md:'3rem'}} maxWidth={'25rem'}>
        <DialogTitle>Notifications</DialogTitle>

        {
          sampleNotification.length > 0?(
            sampleNotification.map(({sender,_id})=>(
              <NotificationItem sender={sender}  _id={_id} handler={freindrequesthander}
              key={_id} />
            ))
          )  : <Typography textAlign={"center"} >No Notifications for you </Typography>
        }
      </Stack>
    </Dialog>
  )
}
// const name=sender.name;
const NotificationItem = memo(({sender,_id,handler}) => {
  // const avatar =sender.avatar;
  const {name,avatar} = sender;
  // // const _id = sender._id;
  return (
  <ListItem>
        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'}>
            <Avatar src={avatar} />
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
            >{`${name} sent you a freind request. `}</Typography>
            <Stack
            direction={{
              xs:'column',
              sm:'row',
            }}
            >
              <Button color='primary'  onclick={()=>handler({_id,accept:true})} >Accept</Button>
              <Button  color='error' onclick={()=>handler({_id,accept:false})} >Reject</Button>

            </Stack>
        </Stack>
    </ListItem>
  )
})


export default Notification;