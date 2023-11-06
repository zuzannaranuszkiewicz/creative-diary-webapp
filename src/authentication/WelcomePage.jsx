import { Outlet } from "react-router-dom";
import CreateAccount from "./forms/CreateAccount";
import LogIn from "./forms/LogIn";

export default function WelcomePage(){


    return(
        <>
          <Outlet/>

          
          <LogIn/>
          <CreateAccount/>  
        </>
    )
}