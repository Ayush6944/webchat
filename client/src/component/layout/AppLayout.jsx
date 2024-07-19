import { Drawer, Grid } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { gradient1 } from '../../color'
import { useErrors } from '../../hooks/hook'
import { useMyChatsQuery } from '../../redux/api/api'
import { setIsMobile } from '../../redux/reducers/misc'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const { isMobile } = useSelector((state) => state.misc);

    // const {} = useSelector((state)=>state.misc);
    const { isLoading, data, isError, refetch, error } = useMyChatsQuery();
    // console.log(isLoading,"isLoading");

    useErrors([{isError,error}]);
    // console.


    const handleDeleteChat = (e, _id,groupChat) => {
      e.preventDefault();
      console.log("delete chat",_id,groupChat)
      // console.log(isMobile, 'JHVBN');
    }

    const handleMobileClose = () => {
      dispatch(setIsMobile(false))
    }
// console.log(isLoading);
// isMobile= true;

    return (
      <>
        <Title />
        <Header />
   
         
       
          <Drawer open={isMobile} onClose={handleMobileClose} variant="temporary">
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
            />
          </Drawer>
      
        <Grid container height={"calc(100vh-1rem)"}>
          <Grid item
            sm={4}
            md={3}
            sx={{
              backgroundImage: gradient1,
              display: { xs: 'none', sm: 'block' },
              overflowY: 'auto',
              height: '100vh',
            }}
            heigth={'100%'}>


           
                <ChatList
                  chats={data?.chats}   // chats hai hi nhi
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                />
              
            



          </Grid>
          {/* second grid maintainence */}
          <Grid item xs={12} sm={8} md={5} lg={6}
            heigth={'100%'} >
            <WrappedComponent {...props} />

          </Grid>
          {/* <Drawer open></Drawer> */}
          <Grid item
            heigth={'100vh'}
            md={4}
            lg={3}
            sx={{
              display: { xs: 'none', md: 'block' },
              padding: '2rem',
              bgcolor: 'rgba(0,0,0,0.5)'
            }}
          >
            <Profile />
          </Grid>


        </Grid>

      </>
    )
  }

}

export default AppLayout