import { Add, Delete, Done, Edit, KeyboardBackspace,Menu } from '@mui/icons-material'
import { Backdrop, Box, Button, Drawer, Grid,IconButton,Stack,TextField,Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../component/styles/StyleComponents';
import AvatarCard from '../component/shared/AavtarCard';
import {sampleUsers, samplechats} from '../sampleDATA/sample'; //see here for sample data 
import UserItem from '../component/shared/UserItem';
import { gradient3, gradient4 } from '../color';

const ConfirmDeleteDialog = lazy(()=>import('../component/dialog/ConfirmDeleteDilaog'));
const AddMember = lazy(()=>import('../component/dialog/AddMember'));


export default function Groups() {
  const chatId=useSearchParams()[0].get('group')
  
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigatback = () => {
    navigate("/");
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev)=>!prev);
  }
  
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  console.log(chatId)

  const isAddMember=false;

  const[isEdit,setIsEdit]=React.useState(false);


  const [groupName,setGroupName]=React.useState('Group name');
  const [groupNameUpdated,setGroupNameUpdated]=React.useState('Group name');

  const updategroupName = () => {
      setIsEdit(false);
      console.log(groupNameUpdated);
    }

  const confirmDeleteHandeler = () => {
    setConfirmDeleteDialog(true);
    }

  const deleteHandler = () => {
    console.log("delete group");
    setConfirmDeleteDialog(false);
  }
  
  const closeDeleteHandler=()=>{
    setConfirmDeleteDialog(false);
  }

  const removeMemberHandler = (id) => {
    console.log("remove member",id);
  }

  const openAddMemberHandler = () => {
    console.log("open add member")

  }



  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);

 



  useEffect(()=>{
    if(chatId){
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdated(`Group Name ${chatId}`);
    }

    return ()=>{      
      setGroupName('');
      setGroupNameUpdated('');
      setIsEdit(false);
    }
    
  },[chatId])
  const IconsBTN = (
  <>
<Box 
sx={{
  display:{
    xs:'block',
    sm:'none',
    position:'fixed',
    right:'1rem',
    top:'1rem',
  },
}} >

  
<IconButton onClick={handleMobile}>
    <Menu />
</IconButton>

  </Box>


<Tooltip title='back'>
  <IconButton
  sx={{
    position: 'absolute',
    top:'2rem',
    left: '2rem',
    bgcolor:"rgba(0,0,0,0.8)",
    color: 'white',
    ":hover":{
      bgcolor: "rgba(0,0,0,0.7)",
      color: 'white',
    }
  }}    
  onClick={navigatback}  
  >  
    <KeyboardBackspace/>
  </IconButton>
</Tooltip>
</>
);
const GroupName = <Stack direction={'row'} alignItems={'center'} justifyContent={'center'
} spacing={'2rem'} padding={'3rem'}
>
  {isEdit?<>
  <TextField  value={groupNameUpdated} onChange={(e)=>setGroupNameUpdated(e.target.value)}  />
  <IconButton onClick={updategroupName}>
    <Done/>
  </IconButton>
  </>: <>
  <Typography variant='h4'>{groupName}</Typography>
  <IconButton onClick={()=>setIsEdit(true)}>
    <Edit/>
  </IconButton>
  </>}
</Stack>

const ButtonGroup=<>
<Stack
direction={{
  sm:'row',
  xs:'column-reverse',
}}
spacing={'1rem'}
p={{
  xs: '0',
  sm: '1rem',
  md:'1rem 4rem',
}}

>
<Button size='large'  variant='contained' startIcon={<Add/>} onClick={openAddMemberHandler} >Add member</Button>
<Button  size='large' variant='contained'color='error' startIcon={<Delete/>}  onClick={confirmDeleteHandeler} >Delete Group</Button>
</Stack>
</>

  return (<Grid container height={'100vh'}>
    <Grid 
    item 
    sx={{
      display:{
        xs: 'none',
        sm: 'block',}
     
    }}
    
    sm={4}
    >
    <GroupList  myGroups={samplechats}
     chatId={chatId} />
    </Grid>

    <Grid 
    item 
    xs={12} 
    sm={8}
    sx={{
      backgroundImage: gradient3, //change gradient here
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      alignItems: 'center',
      padding:'1rem 3rem',
    }} >
      {IconsBTN}

      {groupName && 
      (<>
      {GroupName}
      <Typography 
      margin={'2rem'}
      alignSelf={'flex-start'}
      variant={'body1'}
      >
        Group members
      </Typography>

        <Stack
        maxWidth={'45rem'}
        width={"100%"}
        boxSizing={'border-box'}
        padding={{
          xs: '0',
          sm: '1rem',
          md:'1rem 4rem',
        }}
        spacing={'2rem'}
        bgcolor={'white'}
        height={'50vh'}
        overflow={'auto'}
        
        >
         {/* members list shown here  */}
        {
          sampleUsers.map((i)=> (
            <UserItem user={i} isAdded 
            key={i._id}
            styling={{
              boxShadow:'0 0 0.5rem rgba(0,0,0,0.3)',
              padding:'1rem 2rem',
              borderRadius:'1.5rem',
            }}  
            handler={removeMemberHandler}
            />
          ))}
       

        </Stack>
        {ButtonGroup}
      </>)}
      </Grid>


{
  isAddMember && <Suspense fallback={<Backdrop open/>}>
    <AddMember/></Suspense>
}

{
  confirmDeleteDialog && (
    <Suspense fallback={<Backdrop open/>}>
      <ConfirmDeleteDialog open={confirmDeleteHandeler} 
     handleClose={closeDeleteHandler}
     deleteHandler={deleteHandler}

      />
    </Suspense>
  )
}
    
    <Drawer  
    sx={{
      display: {
        xs: 'block',
        sm: 'none',
      },
    }}
    open={isMobileMenuOpen} 
     onClose={handleMobileClose}
    >
       <GroupList w={'50vw'} 
       
       myGroups={samplechats}
     chatId={chatId} />
    </Drawer>
  </Grid>
  );
};


const GroupList = ({w='100%', myGroups=[],chatId})=>(
 <Stack width={w}
 sx={{
  backgroundImage:gradient4,
  height:'100vh',
  
  overflowY: "auto",
  height: '100vh',

 }}
 >
  {myGroups.length >0 ?(
     myGroups.map((group)=> <GroupListItem group={group} chatId={chatId} key={group._id} />)):
     <Typography textAlign={'center'}> no groups</Typography>}
 </Stack>
 )
 

 
const GroupListItem = memo(({group,chatId})=>{
  const { name,avatar,_id}=group;
  return <Link to={`?group=${_id}`}
  onClick={(e)=>{
    if(chatId === _id) e.preventDefault();
  }}
  >
  <Stack direction={'row'} 
  spacing={'1rem'} alignItems={'center'}

  >
    <AvatarCard avatar={avatar}/>
    <Typography>{name}</Typography>
  </Stack>
  </Link>
})
  
