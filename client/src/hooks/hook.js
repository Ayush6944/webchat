import { useEffect } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) =>{};

useEffect(() => {

    errors.forEach(({isError,error,fallback}))=>{
        if(isError){
            if(fallback) return fallback();
            toast(error?.data?.message||"something went wrong");
        } }
},[errors])


export {useErrors}