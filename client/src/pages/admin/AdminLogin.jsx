// import React from 'react'
import React,{useState} from 'react'
import {Avatar, Button, Container,IconButton,Paper, Stack, TextField, Typography} from "@mui/material"
import { gradient2 } from '../../color'
import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom'
// import { gradient2 } from '../color';
const AdminLogin = () => {

    const isAdmin =false;
    const secretKey=useInputValidation('')

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log("submitted")
    }
    if(isAdmin) return <Navigate to='/admin/dashboard' />;

  return (
    // <div>AdminLogin</div>/
    <div style={
        {
          // backgroundColor: '#4158D0',
  backgroundImage: gradient2,
  
        }
      }>
      <Container component ={"main"}
       maxWidth="xs"
      sx={{
        // top:'10%',
        // padding:'5rem',
        height:'100vh',
        // marginTop:'2%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#f5f5f5'
        }}
      >
  
        <Paper
         elevation={4}
         sx={{
          padding:5,
          display:"flex",
          flexDirection:"column",
          alignItems:"center"
         }}
         >
          {
          <>
          <Typography variant='h5'>Admin Pannel Login</Typography>
          <form style={{
            width:'100%',
            marginTop:'1rem'
  
          }}
          onSubmit={submitHandler} >
            
            <TextField
            required
            fullWidth
            label="enter secret key"
            name="password"
            type='password'
            margin='normal'
            variant='outlined'
            value={secretKey.value}
            onChange={secretKey.changeHandler}
            />
           
  
            <Button variant='contained' 
             type='submit' color='primary'
              fullWidth>Login</Button>
          </form>
          
          </>
          // register portion
           }
        </Paper>
  
  
      </Container></div>
  )
}

export default AdminLogin