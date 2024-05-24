import React from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings, Chat, Group, Notifications, Person } from '@mui/icons-material'
import  moment from 'moment'
import { CurveButton, SearchField } from '../../component/styles/StyleComponents'
// import {LineChart,DoughnutChart} from '../../component/specific/Charts'
import {LineChart,DoughnutChart} from '../../component/specific/Charts'

const Dashboard = () => {

 const Appbar = (
    <Paper
    elevation={3} 
    sx={{
      padding:'2rem',
       margin:'2rem 0',
        borderRadius:'1rem'
    }}
    >

{/* ayush srivastava */}
<Stack direction={'row'} 
alignItems={'center'} 
spacing={'1rem'}>
<AdminPanelSettings sx={{fontSize:'3rem' }}/>

<SearchField placeholder='Search ...' />

<CurveButton>
  Search
</CurveButton>

<Box flexGrow={1} />

<Typography
display={{
xs:'none',
lg:'block'
}
}
color={'rgba(0,0,0,0.,8)'}
textAlign={'center'}

>
  {
    moment().format('dddd ,Do MMMM  YYYY , h:mm:ss a')
  }
</Typography>
<Notifications />
</Stack>
</Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      // alignItems={"center"}
      margin={"2rem 0"}
    >
    
    <Widgetcompo title={'Users'} icon={<Person />} value={34} />
    <Widgetcompo title={'Chats'} icon={<Group/>} value={7} />
    <Widgetcompo title={'Messages'} icon={<Chat/>} value={31} />

    </Stack>
  );

  return (
  <AdminLayout>
    <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{ gap: "2rem" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h4">
                Last Messages
              </Typography>
  <LineChart  />

  </Paper>
  
  <Paper
              elevation={3}
              sx={{
                padding: "1rem ",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", sm: "50%" },
                position: "relative",
                maxWidth: "25rem",
             }}
  >

<DoughnutChart labels={["Single Chats " ,"Group Chats"]}
value={[30,45]} />

<Stack 
position={"absolute"}
direction={"row"}
justifyContent={"center"}
alignItems={"center"}
spacing={"0.5rem"}
width={"100%"}
height={"100%"}
>
  <Group/>
  <Typography>Vs</Typography>
  <Person/>
</Stack>
  </Paper>
</Stack>

{Widgets}

    </Container>
  </AdminLayout>
  )
}

const Widgetcompo = ({title, icon, value}) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}>
  <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid black`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}</Typography>
  
  <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} >
    {icon}
    <Typography>{title}</Typography>
  </Stack>
  </Stack>
  </Paper>
  );

export default Dashboard;