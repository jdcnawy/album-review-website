import { useEffect } from "react";
import LoginForm from "@/frontend/components/LoginForm";
import { useRouter } from "next/router";


export default function Login ({ loginUser, isLoggedIn}){
    const router = useRouter();

    useEffect(() => {
        
        if (isLoggedIn)  router.push("/");
    },[isLoggedIn]);
    
    return(
       
        <main>
            <LoginForm loginUser = {loginUser}/>
        </main>
    );
}