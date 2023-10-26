import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";

export default function Account(){
    const navigate = useNavigate();
    function LogOut(){
        signOut(auth)
        navigate('/')
        alert("You're logged out!")
    }

    const {user} = UserAuth();
    return(
        <>
        <SideBar/>
            <h1>User Account</h1>
            <h2>{user.email}</h2>
            <button onClick={LogOut}>Log Out</button>
        </>
    )
}