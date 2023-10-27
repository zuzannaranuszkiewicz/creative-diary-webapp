import { useState, useEffect } from "react";
import {ref, set, push, serverTimestamp, onValue} from "firebase/database";
import { database } from "../../../firebase-config";
import { UserAuth } from "../../authentication/context/AuthContext";

// function to get time and display it below title
// it is global, so can be used in all functions below
const currentDate = () => {
    var today = new Date();
    // var options = { weekday: 'long' };
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



export function BrainDump(){
    
    // const and function to store and upload BrainDump to Firebase Database
    const [title, setTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const {user} = UserAuth();
    const userID = user.uid;

      function saveBrainDump() {
        // getting new key ID for new BrainDump
        const newBrainDumpID = push(ref(database, 'entries/' + userID));
        const brainDumpID = newBrainDumpID.key;

        //uploading BrainDump data to database
        set(newBrainDumpID, {
            inputType: "BrainDump",
            title: title,
            timestamp: serverTimestamp(),
            text: userInput,
        });

        // confirmation
        alert("BrainDump saved!")
      }

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



export function DailyChallenge(){
    const [prompt, setPrompt] = useState('');
    const [userInput, setUserInput] = useState('');
    const [generatedID, setGeneratedID] = useState ('');
    const {user} = UserAuth();
    const userID = user.uid;


    //hook to check that we don't generate the prompt that user has already answered to
    useEffect(() => {
        function generateUniquePromptID() {
            let newGeneratedID = Math.floor(Math.random() * 41) + 1;
            const userPromptsRef = ref(database, 'users/' + userID + '/prompts/');
            onValue(userPromptsRef, (snapshot) => {
                const data = snapshot.val();
                if (data && data[newGeneratedID]) {
                    generateUniquePromptID(); // ID already exists, generate a new one
                } else {
                    setGeneratedID(newGeneratedID); // Set the generated ID
                }
            });
        }
        generateUniquePromptID(); // Load a unique prompt ID on component mount
    }, []); 

    useEffect(() => {
        function generatePrompt() {
            const promptRef = ref(database, `prompts/${generatedID}`);
            onValue(promptRef, (snapshot) => {
              const data = snapshot.val();
              if (data) {
                setPrompt(data.prompt); // Set the prompt text, assuming 'data' has a 'prompt' property
              }
            });
          }
        generatePrompt(); // Load a prompt on component mount
      }, []); // Empty dependency array to run only once
    
      

    function saveDailyChallenge() {
        // getting new key ID for new DailyChallenge
        const newEntry = push(ref(database, 'entries/' + userID));
        const newEntryID = newEntry.key;
       
        //uploading DailyChallenge data to database
        set(newEntry, {
            inputType: "DailyChallenge",
            title: prompt,
            timestamp: serverTimestamp(),
            text: userInput,
        });
        //add prompt id to user, so we know which prompts generator should avoid
        set(ref(database, 'users/' + userID + '/prompts/' + generatedID), true);

        // confirmation
        alert("DailyChallenge saved!")
      }



    return(
        <>
            <div>
                <p>{prompt}</p>
                <p>{currentDate()}</p>
            </div>
            <button onClick={saveDailyChallenge}>Save</button>
            <hr/>

            <input type="text" value={userInput} onChange={(e => setUserInput(e.target.value))} placeholder="What is it you're thinking of..."/>
            <div>
                Space for toolbar
            </div>
          
        </>
    )
}