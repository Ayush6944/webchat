import React from 'react'
// import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material'
import AppLayout from '../component/layout/AppLayout';
import { AttachFile, Send } from '@mui/icons-material';
import { InputBox } from '../component/styles/StyleComponents';
import FileMenu from '../component/dialog/FileMenu';
import { sampleMessages } from '../sampleDATA/sample';
import MessageComponent from '../component/shared/MessageComponent';
// import MessageComponent from '../component/shared/MessageComponent';

const user ={
  _id:'asad',
  name: 'Ayush'
  }
const Chat=()=> {
  const conatainerRef=React.useRef(null) 
  return (
    <>
    <Stack
    ref={conatainerRef}
    boxSizing={"border-box"}
    padding={'1rem'}
    spacing={"1rem"}
    bgcolor={'#f5f5f5'}
    color={'black'}
    // miscomunication previous height was in %
    height={'80vh'}
    sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
    }}>
      { 
        sampleMessages.map((i)=>(
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      


    </Stack>

      <form action=""
      style={
        {height: '10%',}
      }
      >

        <Stack direction={'row'}
         height={'100%'}
         padding={'1rem'}
         alignItems={'center'}
         position={'relative'}

         >
          <IconButton
          sx={{
            position:'absolute',
            left: '1rem',
            rotate:'30deg'
          }}
          
          >
            {/* attack file button */}
            <AttachFile/>
          </IconButton>

        <InputBox placeholder='Type your msg. here' />

{/* send button */}
        <IconButton type='submit' sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            marginLeft: '0.5rem',
            padding: '0.5rem',
            '&:hover':{
              bgcolor: 'error.dark',
            }

        }}>
          <Send/>
        </IconButton>

        </Stack>
      </form>


    <FileMenu/>
    </>
  )
}

export default AppLayout()(Chat)