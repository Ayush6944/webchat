import React from 'react';
import AppLayout from '../component/layout/AppLayout';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Box bgcolor={'#f5f5f5'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}> 
      <Typography
      p={'2rem'} variant='h5'
      >
        select a friend to chat
      </Typography></Box>
    </div>
  );
}

export default AppLayout()(Home);
