import React,{useState} from 'react'
import {Avatar, Button, Container,IconButton,Paper, Stack, TextField, Typography} from "@mui/material"
import {CameraAlt as CameraAltIcon} from "@mui/icons-material"
import { VisualHiddenInput } from '../component/styles/StyleComponents';
import {useInputValidation , useStrongPassword} from '6pp'
import { usernameValidator } from '../utils/validator';
import { gradient2 } from '../color';
export default function Login() {

const [isLogin,setIsLogin]=useState(true)

const toggleLogin =()=>setIsLogin((prev) => !prev);

const name= useInputValidation('');
const username= useInputValidation('',usernameValidator);
const email= useInputValidation('');
const password= useStrongPassword();
const handlelogin=  (e)=>{
  e.preventDefault();
}
const handleSignup=  (e)=>{
  e.preventDefault();
}

  return (
    
    // <h1>hello</h1>
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
        {isLogin? (
        <>
        <Typography variant='h5'>Login</Typography>
        <form style={{
          width:'100%',
          marginTop:'1rem'

        }}
        onSubmit={handlelogin} >
          <TextField
          required
          fullWidth
          label="Username"
          name="username"
          margin='normal'
          variant='outlined'
          value={username.value}
          onChange={username.changeHandler}

          />
          <TextField
          required
          fullWidth
          label="Password"
          name="password"
          type='password'
          margin='normal'
          variant='outlined'
          value={password.value}
          onChange={password.changeHandler}
          />
          <TextField
          required
          fullWidth
          label="E-Mail"
          name="E-mail"
          type='Email'
          margin='normal'
          variant='outlined'
          value={email.value}
          onChange={email.changeHandler}
          />

          <Button variant='contained'  type='submit' color='primary' fullWidth>Login</Button>

          <Typography fullWidth padding={1}>Did not have account,creat a free accout.</Typography>
          <Button variant='text' 
          sx={{marginTop:'1rem'}}
          color='secondary'  
          onClick={toggleLogin} 
          fullWidth>Register</Button>



        </form>
        
        </>
        // register portion
        ) : (
        <>
        <Typography variant='h5'>Signup form</Typography>
        <form style={{
          width:'100%',
          marginTop:'1rem',
          height:'70%'

        }} 
        onSubmit={handleSignup}
        >
          <Stack position={'relative'}
          width={'10rem'} margin={'auto'}
          height={'10rem'}
          >
            <Avatar  
            sx={{
              width:'10rem',
              height:'10rem',
              objectFit:'contain',

            }}
            />
          <IconButton
          sx={{
            position:'absolute',
            bottom:'0',
            right:'0',
            color:'#fff',
            backgroundColor:'#000',
            ":hover":{
              backgroundColor:'#000',
            }
          }}
          component='label'
          >
            <>
            <CameraAltIcon/>
            <VisualHiddenInput type='file' />
            </>
          </IconButton>


          </Stack>



          <TextField
          required
          fullWidth
          label="Fullname"
          name="Fullname"
          margin='normal'
          variant='outlined'
          value={name.value}
          onChange={name.changeHandler}
          />
          <TextField
          required
          fullWidth
          label="Password"
          name="password"
          type='password'
          margin='normal'
          variant='outlined'
          value={password.value}
          onChange={password.changeHandler}
          />
          {/* Password validator */}
          {password.error && (
            <Typography  color='error' variant='caption'>
              {password.error}
            </Typography>
          )}


          <TextField
          required
          fullWidth
          label="E-Mail"
          name="E-mail"
          type='Email'
          margin='normal'
          variant='outlined'
          value={email.value}
          onChange={email.changeHandler}
          />
          <TextField
          required
          fullWidth
          label="Username"
          name="username"
          type='text'
          margin='normal'
          variant='outlined'
          value={username.value}
          onChange={username.changeHandler}
          />
          {username.error && (
            <Typography  color='error' variant='caption'>
              {username.error}
            </Typography>
          )}

          <Button variant='contained' 
          m={'1 rem'} 
          sx={{marginTop:'1rem'}}
          type='submit' color='primary' 
          fullWidth>REGISTER</Button>


        <Typography textAlign={'center'} sx={{marginTop:'1rem'}}>
          Already have account.</Typography>


        <Button 
        variant='text'
        fullWidth 
        // onclick={toggleLogin} 
        color='success'  
        sx={{marginTop:'0.5rem'}} 
        onClick={toggleLogin}>Login</Button>
        
        </form>
        
        </>
        
        )}
      </Paper>


    </Container></div>
    
  )
  
}
