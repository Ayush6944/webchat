import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../sampleDATA/sample'
import UserItem from '../shared/UserItem'

const AddMember = ({addmember,isLoadingAddmember,chatId}) => {

const [members,setMembers]=useState(sampleUsers);
const [selectMembers,setSelectMembers]=useState([]);

  
  const selectMemberHandler = (id) => {
    setSelectMembers(prev=>
      prev.includes(id) ? prev.filter((currElement)=> currElement !==id ):
        [...prev,id])
  };
const addMemberSubmission=()=>{
    closeHandler();
}

const closeHandler=()=>{
    console.log(chatId)
    setSelectMembers([]);
    setMembers([]);
}

return <Dialog open onClose={closeHandler}>
    <Stack p={'2rem'} width={'20rem'} spacing={"2rem"} >
    <DialogTitle textAlign={'center'}> Add Member </DialogTitle>

    <Stack spacing={'1rem'} >
        {   members.length>0?
            members.map(i=>(
               <UserItem key={i.id} user={i}
                handler={selectMemberHandler}
                isAdded={selectMembers.includes(i._id)}
                />               
            )):<Typography
            textAlign={'center'}
            >No Friends</Typography>
        }
    </Stack>
        <Stack direction={'row'} alignItems={'center'}
        justifyContent={'space-evenly'}>
            <Button color='error' onClick={closeHandler} variant='contained'>
                Cancel
            </Button>
            <Button onClick={addMemberSubmission} variant='contained' color='success'> 
                Add Member
            </Button>
        </Stack>


    </Stack>
     </Dialog>
}

export default AddMember