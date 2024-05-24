import React, { useState } from 'react'
import {Box, Drawer, Grid, IconButton, Stack, Typography} from '@mui/material'
import {Chat, Close, Dashboard, ExitToApp, Group, ManageAccounts, Menu, Message} from '@mui/icons-material'
import { Navigate, useLocation} from 'react-router-dom'
import {Link as Linku} from '../styles/StyleComponents'

// const Link = styled(Link)`
//   text-decoration: none;
//   border-radius: 2rem;
//   padding: 1rem 2rem;
//   color: black;
//   &:hover {
//     color: rgba(0, 0, 0, 0.3);
//   }
// `;
const adminTabs =[
  {
  name: 'dashboard',
  path: '/admin/dashboard',
  icon: <Dashboard/>
},
  {
  name: 'Users',
  path: '/admin/user-management',
  icon: <ManageAccounts/>
},
  {
  name: 'Chats',
  path: '/admin/chat-management',
  icon: <Chat/>
},
  {
  name:'Messages',
  path:'/admin/message-management',
  icon: <Message/>
}


]

const Sidebar = ({w='100%'}) => {

  const location = useLocation();

  const logoutHandler =() =>{
    
  }

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
    <Typography variant="h5" textTransform={"uppercase"}>
    Admin portal </Typography>

<Stack spacing={'1rem'}>
  {adminTabs.map((tab)=>(
    <Linku key={tab.path} to={tab.path}
    sx={
      location.pathname === tab.path &&{
        bgcolor:'black',
        color:'white',
      }
    }
    >
    
    <Stack direction={'row'} 
    alignItems={'center'} 
    spacing={'1rem'}
     >
    
    {tab.icon}
    <Typography textTransform={'uppercase'}> {tab.name} </Typography>

    </Stack>
    </Linku>
  ))}

<Linku onClick={logoutHandler} >
    
    <Stack direction={'row'} 
    alignItems={'center'} 
    spacing={'1rem'}
    
    >
    <ExitToApp/>
    <Typography fontSize={'1.2rem'}  textTransform={'uppercase'} >Logout</Typography>

    </Stack>
    </Linku>
    
</Stack>

  </Stack>
  );
};

const isAdmin = true;

const AdminLayout = ({children}) => {

  const [isMobile , setIsMobile] = useState(false)


  const handleClose = () => {
    setIsMobile(false)
  }
  const handlemobile = () => {
   setIsMobile(!isMobile)
  }

  if(!isAdmin) return <Navigate to="/admin" />;

  return (<Grid container minHeight={'100vh'}>
    <Box 
    sx={{
      display:{xs:'block',md:'none'},
      position:'fixed',
      right:'1rem',
      top:'1rem',
    }}
    >
      <IconButton onClick={handlemobile}>
       {
        isMobile ? <Close/> : <Menu/>
       }
        </IconButton>


    </Box>
<Grid item md={4} lg={3} 
sx={{
    display:{xs:'none',md:'block'}

}}>
<Sidebar/>
</Grid>
{/* // 5.02.16 */}
<Grid
  item 
  xs={12}
  md={8}
  lg={9}
  sx={{
    bgcolor:'#f8f4f0',
  }}
  >
  
    {children}
  </Grid>

<Drawer open={isMobile} onClose={handleClose}
 sx={{
  display:{xs:'block',md:'none'},
}}>
  <Sidebar w="40vw"/>
</Drawer>
 

  </Grid>)
}

export default AdminLayout