import React from 'react'
import Stack from '@mui/material/Stack'
import {Avatar, Typography} from '@mui/material'
import {Face,AlternateEmail,CalendarMonth} from '@mui/icons-material'
import moment from 'moment'
function Profile() {
  return (
        <Stack spacing={'2rem'} direction={'column'} alignItems={'center'} >
        <Avatar
        sx={{
            width: '10rem',
            height: '10rem',
            objectFit:'contain',
            border:'2px solid white'
        }}
        />

        <ProfileCard  heading={"Bio"} text={'hello myself Ayush Srivastava here'} />
        <ProfileCard  heading={"Username"} text={'@AyushJI '} Icon={<AlternateEmail/>} />
        <ProfileCard  heading={"Name"} text={'hello myself Ayush Srivastava here '} Icon={<Face/>} />
        <ProfileCard  heading={"Joined On "} text={moment('2024-04-13T00:00:00.000Z').fromNow()} Icon={<CalendarMonth/>} />
          
        
        </Stack>
  )
}

const ProfileCard = ({text,Icon,heading}) => ( <Stack 
spacing={'1rem'} direction={'row'} alignItems={'center'}
textAlign={'center'}
color={'white'}
>
    {Icon && Icon}
 <Stack>
    <Typography variant="body1" color="initial">{text}</Typography>
    <Typography variant="caption" color={'gray'}>{heading}</Typography>
 </Stack>

</Stack>)

export default Profile