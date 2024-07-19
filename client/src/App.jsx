import React,{Suspense, lazy,useEffect} from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import ProtectRoute from './component/auth/ProtectRoute';
import Loaders from './component/layout/Loaders'; 
import axios from 'axios';
import { server } from './constant/congif';
import { useDispatch, useSelector } from 'react-redux';
import { usernotExists,userExists } from './redux/reducers/auth';
import {Toaster} from 'react-hot-toast';
// import cors from 'cors'
// import cors from 'cors/lib/supports-preflight'

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

// let user = true;

const App = () => {
  // console.log(server); 

  const {user,loader} = useSelector((state)=>state.auth)

  const dispatch = useDispatch();
// 21.47 (3)
  useEffect(()=>{  
      axios
      .get(`${server}/api/v1/user/me`,{ withCredentials: true})
      .then(({data})=> dispatch(userExists(data.user)))
      .catch((err)=>usernotExists())
    ;
  },[dispatch]);


  return loader?(
    <LayuotLoader/>
  ) :(
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
   <Toaster position="bottom-center"/>
    </BrowserRouter>
    
  );
}

export default App;
