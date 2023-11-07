import { SideBar } from "./components/SideBar";
import { UserAuth } from "../authentication/context/AuthContext";
import { GetUser } from "./components/functions/functions";
import { Outlet, useNavigate } from "react-router-dom";
import { EntryGroup } from "./components/EntryGroup";
import { currentDate } from "./components/EntryTypes";
import { useState } from "react";


export default function Dashboard(){
    
    const currentDayAndDate = () => {
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
    const [selectedOption, setSelectedOption] = useState('BrainDump');
    const navigate = useNavigate();

    const changeDisplay = (event) => {
      setSelectedOption(event.target.value);
      navigate("/dashboard/" + event.target.value)
    };  

    return(
        <>
            <SideBar/>
            <div className="flex-col">
                  <p>{currentDayAndDate()}</p>
                <section>
                    <select value={selectedOption} onChange={changeDisplay}>
                        <option value="BrainDump">Brain Dump</option>
                        <option value="DailyChallenge">Daily Challenge</option>
                        <option value="CreativityBooster">Creativity Booster</option>
                    </select>
                    
                    <div className="flex-row">
                        <Outlet/>
                        <div>
                            <div className="Streak"></div>
                            <div className="A Letter To Myself"></div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Today's entries:</h2>
                    <EntryGroup date={currentDate()}/>
                </section>
            </div>
        </>
    )
}