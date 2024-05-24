import React, { useEffect, useState } from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import Table from '../../component/shared/Table'
import { dashboardData } from '../../sampleDATA/sample'
import { transformimage } from '../../lib/Features'
import { Avatar } from '@mui/material'
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
     renderCell:(params)=><Avatar alt={params.row.name} src={params.row.avatar}/>
    //  avatar card rplaced by avatar
    },
    {
      field:'name',
      headerName:'Name',
      headerClassName:'table-header',
       width:200,
     },
    {
      field:'username',
      headerName:'Username',
      headerClassName:'table-header',
       width:200,
     },
      
       {
        field:'friends',
        headerName:'Friends',
        headerClassName:'table-header',
         width:150,
     }
     ,
     {
       
        field:'groups',
        headerName:'Groups',
        headerClassName:'table-header',
         width:150,
     },     
]
   


const UserManagement = () => {

  const [rows,setRows]=useState([])

  useEffect(()=>{
    setRows(dashboardData.users.map(i=>({
      ...i,
      id:i._id,
      avtar:
      transformimage(i.avatar,50),})));
  },[])

    return (
    <AdminLayout>
      <Table heading={"All User"} col={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default UserManagement