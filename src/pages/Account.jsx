import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase-config";
import { GetUser } from "./components/functions/functions";
import { useState, useEffect} from "react";
import { onValue, ref, update } from "firebase/database";

export default function Account(){
    const navigate = useNavigate();
    const [openSide, setOpenSide] = useState(false);
    const [section, setSection] = useState("settings");

    const { user } = UserAuth();
    const userName = GetUser(user.uid);

    function LogOut(){
        signOut(auth)
        navigate('/')
        alert("You're logged out!")
    }

    useEffect(() => {
        if (openSide) {
          navigate(`/account/${section}`);
        }
      }, [openSide, section, navigate]);

    function handleAccountSection(accountSection) {
        setSection(accountSection);
        setOpenSide(true);
      }

    return(
        <>
        <SideBar/>
        <div className="AccountContainer">
            <div className="mainAccount">
                <h1>User Account</h1>
                    <h2>{userName.username}</h2>
                    <p>{user.email}</p>

                    <p>Creative Fields</p>

                    <div>
                        <h3>Manage Your account</h3>

                        <button onClick={() => handleAccountSection("settings")}>Settings</button>
                        <button onClick={() => handleAccountSection("subscription")}>Subscription</button>
                        <button onClick={() => handleAccountSection("security")}>Security & Privacy</button>

                        <button onClick={LogOut}>Log Out</button>
                    </div>
            </div>
            <div className="sideAccount"
                style={{ display: openSide ? "block" : "none" }}>
                <Outlet />
            </div>
        </div>
        </>
    )
}

export function Settings({setTheme, setAccColor}){
    const { user } = UserAuth();
    const userID = user.uid;

    useEffect(() => {
        const themeRef = ref(database, `users/${userID}/theme`);

        onValue(themeRef, (snapshot) => {
        const theme = snapshot.val();
        if (theme) {
            setTheme(theme);
        }
        });
    }, [userID, setTheme]);

    const switchTheme = (selectedTheme) => {
        setTheme(selectedTheme);
        update(ref(database, `users/${userID}`), { theme: selectedTheme }); // Update the theme in the database
    };

    const setLightTheme = () => {
        switchTheme('light');
    };

    const setDarkTheme = () => {
        switchTheme('dark');
    };



    useEffect(() => {
        const accColorRef = ref(database, `users/${userID}/color`);
        onValue(accColorRef, (snapshot) => {
          const color = snapshot.val();
          if (color) {
            setAccColor(color);
          }
        });
      }, [userID, setAccColor]);
    
    const setAccentColor = (selectedColor) => {
        setAccColor(selectedColor);
        update(ref(database, `users/${userID}`), { color: selectedColor });
    };
  

    return(
        <>
            <h2>Account<span>/Settings</span></h2>
            <h3>Mail Notifications</h3>
            {/* (if notifications == true ? <p>I want to receive mail notifications</p> : <p>I don't want to receive mail notifications</p>) */}

            <h3>Customization</h3>
            <p>Themes</p>
            <div>
                <button onClick={setLightTheme}>Light</button>
                <button onClick={setDarkTheme}>Dark</button>
            </div>
            <p>Accent Colour</p>
                <button onClick={()=>{setAccentColor("green")}}>Green</button>
                <button onClick={()=>{setAccentColor("red")}}>Red</button>
                <button onClick={()=>{setAccentColor("purple")}}>Purple</button>
                <button onClick={()=>{setAccentColor("yellow")}}>Yellow</button>
                <button onClick={()=>{setAccentColor("orange")}}>Orange</button>
                <button onClick={()=>{setAccentColor("blue")}}>Blue</button>
                <button onClick={()=>{setAccentColor("pink")}}>Pink</button>

            <p>Custom Toolbar</p>
            <p>Custom Week Display</p>
            <p>Custom Date Format</p>

        </>
    )
}

export  function Subscription(){
    const { user } = UserAuth();
    const userName = GetUser(user.uid);
    return(
        <>
            <h2>Account<span>/Subscription</span></h2>

            <h3>Current Plans</h3>
            <fieldset>
                <div>
                    <input type="radio" id="premium"value="premium"/>
                    <label>Premium</label>
                </div>
                <div>
                    <input type="radio" id="standard" value="standard" />
                    <label>Standard</label>
                </div>
            </fieldset>

            <h3>Payment Method</h3>
            <button>Manage Your Plan</button>
            <button>Cancel Your Plan</button>
        </>
    )  
}

export  function SecurityPrivacy(){
    const { user } = UserAuth();
    const userName = GetUser(user.uid);

    console.log(userName);

    return(
        <>
            <h2>Account<span>/Security & Privacy</span></h2>

            <h3>General Info</h3>
            <p>name: {userName.username}</p>
            <p>email: {user.email}</p>
            <p>password: ********</p>
            <button>View info</button>
            <button>Edit</button>

            <h3>PIN Code</h3>
            <button>View</button>
            <button>Edit</button>

            <h3>Danger Zone</h3>
            <button>Delete Account</button>

        </>
    )  
}
