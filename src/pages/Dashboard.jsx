import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { BrainDump, DailyChallenge } from "./components/BrainDump";
import { GetUser } from "./components/functions/functions";


export default function Dashboard(){
    
    
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

    // call function that will take user data from database
    const { user } = UserAuth();
    const userName = GetUser(user.uid);

    return(
        <>
            <SideBar/>
            <p>{currentDate()}</p>
            <h1>This is dashboard</h1>

            {/* "if(&&) there is userName, display <p></p>" */}
            {userName && userName.username && (<p>Welcome, {userName.username}</p>)}
            <section>
                {/* <BrainDump/> */}
                <DailyChallenge/>
            </section>
        </>
    )
}