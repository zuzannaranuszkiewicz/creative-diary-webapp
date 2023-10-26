import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { BrainDump } from "./components/BrainDump";


export default function Dashboard(){
    const { user } = UserAuth();
    
    const currentDate = () => {
        var today = new Date();
        var options = { weekday: 'long' };
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var year = today.getFullYear();
        var formattedDate =
          new Intl.DateTimeFormat('en-GB', options).format(today) +
          ', ' +
          day +
          '/' +
          month +
          '/' +
          year;
        return formattedDate;
      }; 

    return(
        <>
            <SideBar/>
            <p>{currentDate()}</p>
            <h1>This is dashboard</h1>
            <p>Welcome, {user && user.uid}</p>
            <section>
                <BrainDump/>
            </section>
        </>
    )
}