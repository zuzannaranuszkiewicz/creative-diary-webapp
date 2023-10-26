import { useState } from "react";
import {ref, set } from "firebase/database";
import { database } from "../../../firebase-config";
import { UserAuth } from "../../authentication/context/AuthContext";

export function BrainDump(){
    // function to get time and display it below title
    const currentDate = () => {
        var today = new Date();
        var options = { weekday: 'long' };
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var year = today.getFullYear();
        var formattedDate =
          day +
          '/' +
          month +
          '/' +
          year;
        return formattedDate;
      }; 
    

    // const and function to store and upload BrainDump to Firebase Database
    const [title, setTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const {user} = UserAuth();
    const userID = user.uid;
      function saveBrainDump() {
        set(ref(database, 'posts/' + userID +'/'), {
          username: title,
          text: userInput,
        });
      }
    
// (e => setUsername(e.target.value))

    return(
        <>
            <div>
                <input type="text" value={title} onChange={(e => setTitle(e.target.value))} placeholder="Untitled"/>
                <p>{currentDate()}</p>
            </div>
          
            <button onClick={saveBrainDump}>Save</button>
            <hr/>
            <input type="text" value={userInput} onChange={(e => setUserInput(e.target.value))} placeholder="What is it you're thinking of..."/>
            <div>
                Space for toolbar
            </div>
          
        </>
    )
}