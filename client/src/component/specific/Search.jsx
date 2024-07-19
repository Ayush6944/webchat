import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/hook';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { setIsSearch } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

// const users=[1,2,3];

const Search = () => {
    const search = useInputValidation(" ");
    const dispatch = useDispatch();
    const {isSearch} = useSelector ((state) =>state.misc);
    const [sendfriendRequest,isLoadingSendFreindRequest] = useAsyncMutation(useSendFriendRequestMutation)
    const [searchUser] = useLazySearchUserQuery()
    const [users,SetUsers] = React.useState([]);

    const addFriendHandler = async (id) => {
        await sendfriendRequest("Sending friend request...",
             { userId: id });
      };
     
    const searchCloseHandler = ()=>{
        dispatch(setIsSearch(false));
    }


    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            // console.log("search.value",search.value);

            searchUser(search.value)
            .then(({data})=>SetUsers(data.users))
            .catch((err)=>console.log(err));

        },500);

        return ()=>{
            clearTimeout(timeOut);
        };
    },[search.value]); 

    return (
        
        <Dialog open={isSearch} onClose={searchCloseHandler}>
            <Stack p={'2rem'} 
            direction={'column'}
            width={'25rem'}>
                <DialogTitle textAlign={"center"} width={"25rem"}>Find People.</DialogTitle>
                    <TextField 
                    label={"Search"}
                    value={search.value}
                    onChange={search.changeHandler}
                    variant='outlined'
                    size='small'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                   
                    />
                <List>
                    {
                        users.map((i)=>(
                            <UserItem user={i} key={i._id} 
                            handler={addFriendHandler}
                            handlerIsLoading={isLoadingSendFreindRequest} />
                        ))
                    }
                </List>

            </Stack>

        </Dialog>
        
    );
}

export default Search;
