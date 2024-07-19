import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { server } from "../../constant/congif";

// import {server} from 

const api = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["Chat"],

    endpoints: (builder) =>({
        myChats:builder.query({
            query:()=>({
                url:'chat/my',
                credentials : 'include',
            }),
            providedTags:["Chat"],
        })
    })
})  

export default api;
export const {useMyChatsQuery,
    
} = api;

