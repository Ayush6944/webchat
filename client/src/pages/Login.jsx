import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { gradient2 } from '../color';
import { VisualHiddenInput } from '../component/styles/StyleComponents';
import { server } from '../constant/congif';
import { userExists } from '../redux/reducers/auth';
import { usernameValidator } from '../utils/validator';
export default function Login() {

const [isLogin,setIsLogin]=useState(true)

const toggleLogin =()=>setIsLogin((prev) => !prev);

const name= useInputValidation('');
const username= useInputValidation('',usernameValidator);
const email= useInputValidation('');
const password= useStrongPassword();

const bio = useInputValidation("");

const avatar = useFileHandler("single");

const dispatch = useDispatch();



const handlelogin = async(e)=>{
  e.preventDefault();

  const config = {
  withCredentials:true,
  headers:{
    "Content-Type":"application/json",
  }
  };

  try {
    const {data} = await axios.post(
      `${server}/api/v1/user/login`,
      {
      username:username.value,
      password:password.value, 
    },
  config
  );
  dispatch(userExists(true))
  toast.success(data.message);

  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "something went wrong");
  }
}

const handleSignup= async(e)=>{
  e.preventDefault();

  const formData = new FormData();
  formData.append("avatar",avatar.file);
  formData.append("name",name.value);
  formData.append("email",email.value);
  formData.append("username",username.value);
  formData.append("password",password.value);
  formData.append("bio",bio.value);

  const config={
    withCredentials:true
,
headers:{
"Content-Type":"multipart/form-data",
},  };

try {
  const { data } = await axios.post(
    `${server}/api/v1/user/new`,
    formData,
    config
  );
      dispatch(userExists(data.user))
      toast.success(data.message);
      
    } catch (error) {
    toast.success(error?.response?.data?.message || "something went wrong");
    console.log(error);
  }

}

  return (
    <div
    style={{
      backgroundImage: gradient2,
    }}
  >
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "110vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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

          <Button 
          sx={{
                    marginTop: "1rem",
                }}
          variant='contained'  type='submit' color='primary' fullWidth
          // disabled={isLoading}
          >Login</Button>

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
          // height:'70%'

        }} 
        onSubmit={handleSignup}
        >
          <Stack position={'relative'}
          width={'10rem'}
          margin={'auto'}
          height={'10rem'}
          >
            <Avatar  
            sx={{
              width:'10rem',
              height:'10rem',
              objectFit:'contain',

            }}
            src={avatar.preview}
            />
         <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.7)",
                      },
                    }}
                    component="label"
                  >
            <>
            <CameraAltIcon/>
            <VisualHiddenInput 
             type="file"
             onChange={avatar.changeHandler} 
             />
            </>
          </IconButton>


          </Stack>
          {avatar.error && (
                  <Typography
                    m={"1rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}



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
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
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
        sx={{
          marginTop:'0.5rem',
          ":hover":{
              backgroundColor:'lightgreen',
          }
          }
      } 
        onClick={toggleLogin}
      
        >Login</Button>
        
        </form>
        
        </>
        
        )}
      </Paper>


    </Container></div>
    
  )
  
}
