import { NavLink } from "react-router-dom";

export function SideBar(){

    return(
        <nav>    
            <NavLink to="/dashboard/BrainDump">Dashboard</NavLink>
            <NavLink to="/library">Library</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/account">Account</NavLink>


        </nav>
    )

}