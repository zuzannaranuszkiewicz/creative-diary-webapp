import { useState } from "react";
import { NavLink } from "react-router-dom";

export function SideBar(){

    const [opensSideMenu, setOpenSideMenu] = useState(false);

    return(
        <>
            <button onClick={opensSideMenu}>x</button>
            <div>
                <button onClick={() => setOpenSideMenu(false)}>x</button>
                <nav>    
                    <NavLink to="/dashboard/BrainDump">Dashboard</NavLink>
                    <NavLink to="/library">Library</NavLink>
                    <NavLink to="/calendar">Calendar</NavLink>
                    <NavLink to="/account">Account</NavLink>
                </nav>
            </div>

        </>
        
    )

}