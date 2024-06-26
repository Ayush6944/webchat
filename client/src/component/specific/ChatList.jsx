import React from 'react'
import Stack from '@mui/material/Stack'
import ChatItem from '../shared/ChatItem';



const ChatList = ({
        chats=[] , w='100%', chatId, onlineUsers=[], newMessagesAlert=[{
            chatId:" ",
            count:0,
        }], handleDeleteChat,
    }) => {
        return (
            <Stack width={w} direction={"column"} 
            overflow={'auto'}
            height={'100%'}>
    
    {
        chats?.map((data,index)=>{

            const {avatar,_id,name,groupChat,members}=data;

            const newMessageAlert = newMessagesAlert.find(
                // (alert)=>alert.chatId===_id
                ({chatId}) =>chatId === _id
                // ({count})=>count===count
                
            )
            const isOnline = members?.some((member)=>onlineUsers.includes(_id));

            return(
                <ChatItem 
                index={index}
                newMessageAlert={newMessageAlert} 
                handleDeleteChat={handleDeleteChat}
                isOnline={isOnline} 
                avatar={avatar}
                name={name}
                _id={_id}
                key={_id}
                groupChat={groupChat}
                sameSender={chatId === _id}
                />
            )
        })
    }
            </Stack>
        );
    }
    
   

export default ChatList