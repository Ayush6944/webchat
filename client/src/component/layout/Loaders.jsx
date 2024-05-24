import React from 'react'
import {Grid,Skeleton} from '@mui/material'
// import  from '@mui/material';
import Stack from '@mui/material/Stack'

function Loaders() {
  return (
    <Grid container height={"calc(100vh-6rem)" }
    spacing={'2rem'} >
    <Grid item
    sm={4}
    md={3}
    sx={{
      display: { xs: 'none', sm: 'block' },
    }}
      heigth={'100%'}>
      <Skeleton   varient='rectangle' height={'100%'} />


      </Grid>
    {/* second grid maintainence */}
    <Grid item xs={12} sm={8} md={5} lg={6} heigth={'100%'} bgcolor="yellow.main">
      <Stack spacing={'0.5rem'} >
        {Array.from({length:10}).map((_,index)=>{
            return(
                <Skeleton  key={index}  varient='rectangle' height={'5rem'} />
            )
        })}
      </Stack>
    <Skeleton varient='rectangle' />
    </Grid>
    <Grid item  heigth={'100%'} 
    md={4}
    lg={3}
    sx={{
    display: { xs: 'none', md: 'block' },
    padding: '1rem',
    bgcolor:'black.main',
    }}
    ><Skeleton varient='rectangle' />
    </Grid>


</Grid>
  )
}

export default Loaders