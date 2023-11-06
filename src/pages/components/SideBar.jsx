import { useState } from "react";
import { NavLink } from "react-router-dom";
import '../../styles/sidebar.css';

export function SideBar(){

    const [openSideMenu, setOpenSideMenu] = useState(false);

    const toggleSideMenu = () => {
      setOpenSideMenu(!openSideMenu);
    };

    return(
        <>
        <button onClick={toggleSideMenu}>Toggle</button>
  
        <div className={`sidebar ${openSideMenu ? "open" : ""}`}>
          <button onClick={toggleSideMenu}>x</button>
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