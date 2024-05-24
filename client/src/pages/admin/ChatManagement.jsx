import React, { useEffect, useState } from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import Table from '../../component/shared/Table'
import { Avatar, Stack} from '@mui/material'
import { dashboardData } from '../../sampleDATA/sample'
import { transformimage } from '../../lib/Features'
import AvatarCard from '../../component/shared/AavtarCard'
const columns=[
  {
  field:'id',
  headerName:'ID',
  headerClassName:'table-header',
   width:200
  },
   {
    field:'avatar',
    headerName:'Avatar',
    headerClassName:'table-header',
     width:150,
     renderCell:(params)=><AvatarCard avatar={params.row.avatar}/>
    },
    {
      field:'name',
      headerName:'Name',
      headerClassName:'table-header',
       width:200,
     },
    {
      field:'totalMembers',
      headerName:'TotalMembers',
      headerClassName:'table-header',
       width:220,
     },
      
       {
        field:'members',
        headerName:'Members',
        headerClassName:'table-header',
         width:400,
         renderCell:(params)=>
         <AvatarCard max={100} avatar={params.row.members}/>
     }
     ,
     {
       
        field:'totalMessages',
        headerName:'Total Messages',
        headerClassName:'table-header',
         width:150,
     },     
     {       
        field:'creator',
        headerName:'Created By',
        headerClassName:'table-header',
         width:250,
         renderCell:(params)=>
          <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
            <Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>
           <span> {params.row.creator.name}</span>
          </Stack>

     },     
]
   


const ChatManagement = () => {

  const [rows,setRows]=useState([])

  useEffect(()=>{

    setRows(dashboardData.chats.map((i)=>({
      ...i,
      id:i._id,
      avatar :i.avatar.map((i)=>transformimage(i,50) ),
      members:i.members.map((i)=>transformimage(i.avatar,50) ),
      // name:i.name,
     
    })))
  },[])

    return (
    <AdminLayout>
      <Table heading={"All Chats"} col={columns} rows={rows}/>
    </AdminLayout>
  )
}

// export default UserManagement

export default ChatManagement