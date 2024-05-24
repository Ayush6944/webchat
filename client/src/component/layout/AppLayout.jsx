import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import {Grid} from '@mui/material'
import ChatList from '../specific/ChatList'
import { samplechats } from '../../sampleDATA/sample'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { gradient1 } from '../../color'
const AppLayout=()=>(WrappedComponent)=> {
  return (props)=>{
    const params = useParams();
    const chatId= params.chatId;
    const handleDeleteChat=(e,_id,groupChat)=>{
      e.preventDefault();
      console.log("delete chat",_id,groupChat)
    }



    return (
        <>
        
          <Title/>
          <Header/>
        <Grid container height={"calc(100vh-1rem)"}>
      <Grid item
      sm={4}
      md={3}
      sx={{
        backgroundImage:gradient1,
        display: { xs: 'none', sm: 'block' },
        overflowY: 'auto',
        height: '100vh',
      }}
         heigth={'100%'}>


        <ChatList 
        chats={samplechats}  
        chatId={chatId}
        handleDeleteChat={handleDeleteChat}
        />



        </Grid>
      {/* second grid maintainence */}
      <Grid item xs={12} sm={8} md={5} lg={6}
       heigth={'100%'} >
        <WrappedComponent {...props}/>
      
      </Grid>
      <Grid item 
      heigth={'100vh'} 
      md={4}
      lg={3}
      sx={{
      display: { xs: 'none', md: 'block' },
      padding: '2rem',
      bgcolor:'rgba(0,0,0,0.5)'
      }}
      >
        <Profile/>
      </Grid>


  </Grid>
          
        </>
    )
  }

}

export default AppLayout