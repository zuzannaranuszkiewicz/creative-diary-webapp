import { useState } from 'react';
import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
    const [chosenDate, setChosenDate] = useState(new Date()); // State to store the chosen date

    const handleDateChange = (date) => {
      setChosenDate(date); // Update the chosen date when the date is clicked
    };

    const tileClassName = ({ date, view }) => {
      if (view === 'month' && date.getDate() === new Date().getDate()) {
        return 'current-day'; // Add a custom class for the current day
      }
      return '';
    };
  
    return (
      <div>
        <SideBar/>
        <h1>Calendar Page</h1>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <Calendar
            onChange={handleDateChange}
            value={chosenDate}
            tileClassName={tileClassName} // Pass the tileClassName function to customize the calendar view
            tileStyle={{
              border: "2px solid red",
              color: "red", // Set the border color for the current day
            }}
          />
           <EntryGroup date={chosenDate.toLocaleDateString('en-GB')} /> {/* Pass the chosen date to the EntryGroup component */}
        </div>
       
      </div>
    );
}
