import React,{Suspense, lazy} from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import ProtectRoute from './component/auth/ProtectRoute';
import Loaders from './component/layout/Loaders';
// import ChatManagement from './pages/admin/ChatManagement';
// import UserManagement from './pages/admin/UserManagement';
// import GroupManagemnt from './pages/admin/GroupManagemnt';
// import MessageMAnagement from './pages/admin/MessageMAnagement';
// import Dashboard from './pages/admin/Dashboard';
// import { Dashboard } from '@mui/icons-material';



const Home=lazy(()=>import('./pages/Home'));

const Login = lazy(()=>import('./pages/Login'));
const Chat = lazy(()=>import('./pages/Chat'));
const Group = lazy(()=>import('./pages/Group'));


// admin login files
const AdminLogin = lazy(()=>import('./pages/admin/AdminLogin'));
const Dashboard = lazy(()=>import('./pages/admin/Dashboard'));
const ChatManagement = lazy(()=>import('./pages/admin/ChatManagement'));
const UserManagement = lazy(()=>import('./pages/admin/UserManagement'));
// const GroupManagemnt = lazy(()=>import('./pages/admin/GroupManagemnt'));
const MessageMAnagement = lazy(()=>import('./pages/admin/MessageMAnagement'));


let user = true;

const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loaders/>}>
    <Routes>
      <Route element={<ProtectRoute user={user}/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<h1>about</h1>}/>
            <Route path="/chat/:chatId" element={<Chat />} />
          <Route path='/group' element={<Group/>}/>
     </Route>
      
      <Route path='/login'
       element={
      <ProtectRoute user={!user} redirect="/">
         <Login/>
      </ProtectRoute>
     }/>

     {/* Admin Routing  */}

     <Route path='/admin' element={<AdminLogin/>}/>
     <Route path='/admin/dashboard' element={<Dashboard/>}/>
     <Route path='/admin/chat-management' element={<ChatManagement/>}/>
      <Route path='/admin/user-management' element = { <UserManagement/>}/>
      {/* <Route path='/admin/group-management' element= {<GroupManagemnt/>}/> */}
      <Route path='/admin/message-management' element={<MessageMAnagement/>}/>


     <Route path='*' element={<h1>404 error not found</h1>}/>
    </Routes>


    </Suspense>
   
    </BrowserRouter>
    
  );
}

export default App;
