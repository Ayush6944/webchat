import React, { useEffect } from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import Table from '../../component/shared/Table'
import { dashboardData } from '../../sampleDATA/sample'
import { fileformat, transformimage } from '../../lib/Features'
import moment from 'moment'
import AvatarCard from '../../component/shared/AavtarCard'
import { Avatar,Box,Stack } from '@mui/material'
import RenderAttachment from '../../component/shared/RenderAttachment'


  const columns=[
    {
    field:'id',
    headerName:'ID',
    headerClassName:'table-header',
     width:200
    },
  
      {
        field:'name',
        headerName:'Name',
        headerClassName:'table-header',
         width:200,
       },
      
        {
          field:'attachments',
          headerName:'Attachments',
          headerClassName:'table-header',
           width:200,
           renderCell:(params)=>{

            const {attachments} = params.row;
            return attachments?.length>0? attachments.map((i)=>{
              const url=i.url;
              const file=fileformat(url);
            return <Box>
              <a href={url} 
              download
              target='_blank'
              style={{
                color:'black'
              }}
              >
              {RenderAttachment(file,url)}
              </a>
            </Box>
          
          }
            ) :"No Attachments";
     } 
        },
         {
          field:'sender',
          headerName:'Sent by',
          headerClassName:'table-header',
           width:150,
           renderCell:(params)=>(
            <Stack direction={"row"} alignItems={"center"} spacing={'1rem'}>
              <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
            <span>{params.row.sender.name}</span>
            </Stack>
           ) }
       ,
       {
         
          field:'groupChat',
          headerName:'Group Chat' ,
          headerClassName:'table-header',
           width:100,
       }, 
       {
         
          field:'content',
          headerName:'Content' ,
          headerClassName:'table-header',
           width:300,
       }, 
       {
        field:"createdAt",
        headerName:'Created At',
        headerClassName:'table-header',
         width:200,
       }    
         
  ]



const MessageMAnagement = () => {

const [rows,setRows]=React.useState([])

useEffect(()=>{
  setRows(dashboardData.messages.map(i=>({
    ...i,
    id:i._id,
    name:i.name,
    sender:{
      name:i.sender.name,
      avatar:transformimage(i.sender.avatar,50)
    },
    createdAt:moment(i.createdAt).format('MMM Do YYYY, h:mm:ss a'),

  })))
},[])

  return (
    <AdminLayout>
      <Table heading={"All Messages"} 
      rowHeight={200}
      col={columns} rows={rows} />
    </AdminLayout>
  )
}

export default MessageMAnagement