import React, { useState } from 'react'
// import React from 'react'
import {List, Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import UserItem from '../shared/UserItem'
// import {sampleusers} from '../../data/users'
import { sampleUsers } from '../../sampleDATA/sample'
import {useInputValidation} from '6pp'

function NewGroup() {

  const groupName= useInputValidation('')

  const [members,setMembers]=useState(sampleUsers);
  const [selectMembers,setSelectMembers]=useState([]);

  
  const selectMemberHandler = (id) => {
    setSelectMembers(prev=>
      prev.includes(id) ? prev.filter((currElement)=> currElement !==id ):
        [...prev,id])
  };
  
  const submitHandler = () => {
    console.log('submit')
  }
   console.log(selectMembers);
  return (
    <Dialog open>
      <Stack p={{xs:'1rem',sm:'2rem',md:'3rem'}}
      spacing={'2rem'} maxWidth={'25rem'} 
      varient='h4'
      >
        <DialogTitle>create a new group</DialogTitle>

        <TextField  label='Group Name' value={groupName.value} 
        onChange={groupName.changeHandler}  />
        <Typography varient='text'>
          Members
        </Typography>

      <Stack>
      
      {
        sampleUsers.map((i)=>(
            <UserItem user={i}
             key={i._id}
              handler={selectMemberHandler}
              isAdded={selectMembers.includes(i._id)}
              />
                        ))
                    }
                
      </Stack>
<Stack direction={'row'} justifyContent={'space-evenly'}>
  <Button varient='text' color='error' >Cancel</Button>
  <Button varient='contained'
  color='primary' size='large'
  onClick={submitHandler}
  >
    create</Button>
</Stack>
        
      </Stack>
    </Dialog>
  )
}

export default NewGroup