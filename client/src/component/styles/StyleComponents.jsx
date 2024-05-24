import {styled} from '@mui/material/styles';
import {Link as linkcomponenet} from 'react-router-dom';

export const VisualHiddenInput=styled('input')({
    position:'absolute',
    border:0,
    clip:'rect(0 0 0 0)',
    height:1,
    margin:-1,
    overflow:'hidden',
    padding:0,
    whiteSpace:'nowrap',
    width:1
})

export const Link = styled(linkcomponenet)`
text-decoration:none;
color:black;
padding:1rem;
&:hover{
    background-color:rgba(0,0,0,1);
    color:white;
}
`
export const InputBox=styled('input')`
    border:none;
    border-bottom:1px solid black;
    padding:0 3rem;
    border-radius:2rem;
    width:100%;
    &:focus{
        outline:none;
        border-bottom:3.5px solid black;   

    }

    height:100%;
    background-color:#f5f5f5;
    }
`



export const SearchField =styled('input')`
    padding:1rem 2rem;
    width:20vmax;
    border:none;
    outline:none;
    border-radius:1.5rem;
    background-color:#f5f5f5;
    font-size:1.1rem;

`

export const CurveButton =styled('button')`
padding:1rem 2rem;
border:none;
border-radius:1.5rem;
background-color:#f5f5f5;
font-size:1.1rem;   
color:black;
cursor:pointer;
&:hover{
    background-color:rgba(0,0,0,1);
    color:white;
}
`