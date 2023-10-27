import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ref, set, push, serverTimestamp, onValue} from "firebase/database";
import { database } from "../../../firebase-config";
import { UserAuth } from "../../authentication/context/AuthContext";

// function to get time and display it below title
// it is global, so can be used in all functions below
export const currentDate = () => {
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


export function ChooseInputType(){
    return(
        <>
            <h2>Choose a new entry</h2>
            <div>
                <Link to="/dashboard/BrainDump">
                    <div>
                        <img></img>
                        <p>Brain Dump</p>
                    </div>
                </Link>

                <Link to="/dashboard/DailyChallenge">
                    <div>
                        <img></img>
                        <p>Daily Challenge</p>
                    </div>
                </Link>

                <Link to="/dashboard/CreativityBooster">
                    <div>
                        <img></img>
                        <p>Creativity Booster</p>
                    </div>
                </Link>
            </div>
        </>
    )
}



export function BrainDump(){
    const navigate = useNavigate();
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
        alert("BrainDump saved!");
        // navigate to ChooseInputType component
        navigate("/dashboard/ChooseEntryType")
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
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [userInput, setUserInput] = useState('');
    const [generatedID, setGeneratedID] = useState ('');
    const {user} = UserAuth();
    const userID = user.uid;


    useEffect(() => {
        function generateUniquePromptID() {
            let newGeneratedID = Math.floor(Math.random() * 41) + 1; 

            //loading data from user, checking if they already answered for this prompt
            const userPromptsRef = ref(database, 'users/' + userID + '/prompts/');
            onValue(userPromptsRef, (snapshot) => {
                const data = snapshot.val();
                
                if (data && data[newGeneratedID]) {
                    generateUniquePromptID(); // if ID already exists, generate a new one (call function again)
                } else {
                    setGeneratedID(newGeneratedID); // if Id is not used yet, set the generated ID
                }
            });
        }

        function generatePrompt() {
                   // loading prompt data, searching for the one with ID we just generated
            if(generatedID !== '') {
            const promptRef = ref(database, `prompts/${generatedID}`);
            onValue(promptRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {setPrompt(data.prompt);}
            });
            }
        }

        // calling function we just wrote, cuz otherwise they won't work 
        generateUniquePromptID();
        generatePrompt(); // generate ID
    }, [generatedID]); //running UseEffect every time, when generatedID changes

      
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
        navigate('/dashboard/ChooseEntryType');
      }

    return(
        <>
            <div style={{display:"flex", gap:"2rem"}}>
                <div>
                    <h2>{prompt}</h2>
                    <p>{currentDate()}</p>
                </div>
                <button onClick={saveDailyChallenge}>Save</button>
            </div>
           
            <hr/>

            <input type="text" value={userInput} onChange={(e => setUserInput(e.target.value))} placeholder="What is it you're thinking of..."/>
            <div>
                Space for toolbar
            </div>
          
        </>
    )
}

export function CreativityBooster(){
    const navigate = useNavigate();
    function openSTH(){
        navigate('/dashboard/ChooseEntryType');
    }

    return(
        <>
            <h2>Today's activity</h2>
            <button onClick={openSTH}>Save</button>
        </>
    )
}