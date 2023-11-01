import { useState, useEffect } from 'react';
import { EntryGroup, GetEntries } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import Calendar from "react-calendar";
import { UserAuth } from '../authentication/context/AuthContext';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
    const {user} = UserAuth();
    const entries = GetEntries(user.uid);
    const [inputType, setInputType] = useState(null);
    const [chosenDate, setChosenDate] = useState(new Date());
    const [markedDates, setMarkedDates] = useState([]);

    useEffect(() => {
        const dates = entries
            .filter(entry => entry.inputType === inputType)
            .map(entry => new Date(entry.timestamp));
        setMarkedDates(dates);
    }, [entries, inputType]);

    function handleClick(value){
        setInputType(value);
    }


    return (
        <div>
            <SideBar/>
            <h1>Calendar Page</h1>
        
            <button onClick={() => handleClick("BrainDump")}>Brain Dump</button>
            <button onClick={() => handleClick("DailyChallenge")}>Daily Challenge</button>
            <button onClick={() => handleClick("CreativityBooster")} >Creativity Booster</button>

            
            <div  style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
            <div>
                <Calendar
                      value={chosenDate}
                      onChange={setChosenDate}
                      tileContent={({ date }) =>
                          markedDates.find(
                              markedDate => new Date(markedDate).toDateString() === date.toDateString()
                          ) ? <div style={{ backgroundColor: inputType === 'BrainDump' ? 'green' : (inputType === 'DailyChallenge' ? 'red' : 'blue'), width: 6, height: 6, borderRadius: '50%' }}></div> : null
                      }
                  />
                
            </div>
            <EntryGroup date={chosenDate?.toLocaleDateString('en-GB')} inputType={inputType}/>
            </div>
        </div>
    );
}



// export default function CalendarPage() {
//     const {user} = UserAuth();
//     const entries = GetEntries(user.uid);
//     console.log(entries);

//     const [chosenDate, setChosenDate] = useState(new Date()); // State to store the chosen date
//     const [inputType, setInputType] = useState('');
//     const handleDateChange = (date) => {
//       setChosenDate(date); // Update the chosen date when the date is clicked
//     };

//     const tileClassName = ({ date, view }) => {
//       if (view === 'month' && date.getDate() === new Date().getDate()) {
//         return 'current-day'; // Add a custom class for the current day
//       }
//       return '';
//     };

//     function handleClick(value){
//       setInputType(value);
      
//     }
  
//     return (
//       <div>
//         <SideBar/>
//         <h1>Calendar Page</h1>
        
//         <button onClick={() => handleClick("BrainDump")}>Brain Dump</button>
//         <button onClick={() => handleClick("DailyChallenge")}>Daily Challenge</button>
//         <button onClick={() => handleClick("CreativityBooster")} >Creativity Booster</button>


//         <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
//           <Calendar
//             onChange={handleDateChange}
//             value={chosenDate}
//             tileClassName={tileClassName} // Pass the tileClassName function to customize the calendar view
//             tileStyle={{
//               border: "2px solid red",
//               color: "red", // Set the border color for the current day
//             }}
//           />
//            <EntryGroup date={chosenDate.toLocaleDateString('en-GB')} inputType={inputType}/> {/* Pass the chosen date to the EntryGroup component */}
//         </div>
       
//       </div>
//     );
// }
