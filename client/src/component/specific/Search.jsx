import React from 'react';
import {Dialog,DialogTitle,List,InputAdornment,Stack,TextField} from '@mui/material'
import { useInputValidation } from '6pp'
import {Search as SearchIcon} from '@mui/icons-material'
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../sampleDATA/sample';

// const users=[1,2,3];

const Search = () => {
    const search = useInputValidation(" ");
    const addFriendHandeler = (id)=>{
        console.log(id);
    }
    let isLoadingSendFreindRequest = false;
    const [users,SetUsers] = React.useState(sampleUsers)
    
    return (
        
        <Dialog open>
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
                            <UserItem user={i} key={i._id} handler={addFriendHandeler}
                            handlerIsLoading={isLoadingSendFreindRequest} />
                        ))
                    }
                </List>

            </Stack>

        </Dialog>
        
    );
}

export default Search;
