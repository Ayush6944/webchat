import React, { Suspense, useState } from 'react';
import { AppBar,Box,Toolbar,Tooltip,Typography,IconButton} from '@mui/material';
import { Add, Group, LoginOutlined, LoginRounded, Logout, Menu, NotificationAdd, Notifications, Search } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
// import Login from '../../pages/Login';
// import SearchDialog from '..fi/search';
// import SearchDailog from '../specific/Search';
const SearchDailog = React.lazy(()=>import('../specific/Search'));
const Notification= React.lazy(()=>import('../specific/Notification'));
const NewGroupDialog = React.lazy(()=>import('../specific/NewGroup'));
const Header = () => {
    const navigate = useNavigate();


    const [isMobile, setIsMobile]=useState(false);
    const [isSearch, setIsSearch]=useState(false);
    const [isNewgroup, setIsNewgroup]=useState(false);
    const [isNotification, setIsNotification]=useState(false);



    const HandleMobile = () => {
        console.log('mobile');
        setIsMobile((prev)=>!prev);
    }
    const openSearch = () => {
        // console.log('search');
        setIsSearch((prev)=>!prev);
    }
    const opennewgroup = () => {
        // console.log('new group');
        setIsNewgroup((prev)=>!prev);
    }
    const navigategroup = () => navigate('/group');

    const Handlelogout = () => {
        // localStorage.removeItem('token');
        console.log('logout');
    }
    const Handlenotificatio = () => {
        setIsNotification((prev)=>!prev)
    }

   

    return (
        <>
        <Box sx={{ flexGrow: 1 }} height={'4 rem'}>
            <AppBar position="static"
            sx={{
                bgcolor:('#ea7070')
            }}  >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, 
                    display:{xs:'none',sm:'block'}
                    }}>Chating</Typography>

                <Box
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                    }}>
                        {/* mobile screen */}
                        <IconButton color='inherit' onClick={HandleMobile}>
                        <Menu/>
                        </IconButton>

                    </Box>

                    <Box sx={{
                        flexGrow: 1,
                    }}>
{/* empty box */}

                    </Box>

                    <Box>
                        <Tooltip title='Search Contacts'>
                    <IconButton color='inherit' size='large' onClick={openSearch} >
                        <Search/>
                    </IconButton></Tooltip>
                    <Tooltip title='New Group'>
                    <IconButton color='inherit' size='large' onClick={opennewgroup}>
                                            <Add/>
                                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Manage Gropu'>
                        <IconButton color='inherit' size='large' onClick={navigategroup}>
                            <Group/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Logout'>
                        <IconButton color='inherit' size='large' onClick={Handlelogout}>
                            <LoginRounded/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Notification'>
                        <IconButton color='inherit' size='large' onClick={Handlenotificatio}>
                            <Notifications/>
                        </IconButton>
                    </Tooltip>
                    
                    </Box>
                </Toolbar>



            </AppBar>
         </Box>
        
        {isSearch && (<Suspense fallback={<div>Loading...</div>}>
            <SearchDailog/></Suspense>)} 
        {
            isNotification && (<Suspense fallback={<div>Loading...</div>}>
            <Notification/></Suspense>
    )} 
        {
            isNewgroup && (<Suspense fallback={<div>Loading...</div>}>
            <NewGroupDialog/></Suspense>)
       } 
        
        
        </>
    );
}

export default Header;
