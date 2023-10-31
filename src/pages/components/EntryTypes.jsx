import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ref, set, push, serverTimestamp, onValue} from "firebase/database";
import { database } from "../../../firebase-config";
import { UserAuth } from "../../authentication/context/AuthContext";
import { AddProject, SelectProject } from "./Projects";
import { AddTag, SelectTag } from "./Tags";

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


export function SaveEntry({open, onClose, ...props}){
    if (!open) return null;
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const {inputType, title, userInput, promptID} = props;
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const {user} = UserAuth();
    const userID = user.uid;

    function dbUpload(){
        const newEntry = push(ref(database, 'entries/' + userID));

        //uploading BrainDump data to database
        const entryData = {
            timestamp: serverTimestamp(),
            text: userInput
        };
        
        if (inputType) {
            entryData.inputType = inputType;
        }
        
        if (title) {
            entryData.title = title;
        }
        
        if (promptID) {
            entryData.promptID = promptID;
        }
        
        if (selectedProjects && selectedProjects.length > 0) {
            entryData.projects = selectedProjects;
        }
        
        if (selectedTags && selectedTags.length > 0) {
            entryData.tags = selectedTags;
        }

        set(newEntry, entryData);

        if (promptID){
            set(ref(database, 'users/' + userID + '/prompts/' + promptID), true);
        }

        // confirmation
        alert("Entry saved!");
        navigate("/dashboard/ChooseEntryType")
        // navigate to ChooseInputType component
        
    }
    
    return (
        <>  
            <div className="overlay" onClick={onClose}>
                <div className="popUp" onClick={(e => {e.stopPropagation();})}>
                <button onClick={onClose}>x</button>
                    <div>
                        <h2>Add Tags</h2>
                        <SelectTag onTagSelect={setSelectedTags}/>
                        <AddTag/>
                    </div>
                    <div>
                        <h2>Assign to a Project</h2>
                        <AddProject open={openModal} onClose={() => setOpenModal(false)}/>
                        <SelectProject onProjectSelect={setSelectedProjects} />
                        <button onClick={() => setOpenModal(true)}>+</button>
                        
                    </div>
                    <button onClick={dbUpload}>Save</button>
                </div>
            </div>
        </>
    )
}


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
    const [title, setTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const [openSave, setOpenSave] = useState(false);
    
    return(
        <>
            <div>
                <input type="text" value={title} onChange={(e => setTitle(e.target.value))} placeholder="Untitled"/>
                <p>{currentDate()}</p> 
                <input type="text" value={userInput} onChange={(e => setUserInput(e.target.value))} placeholder="What is it you're thinking of..."/>
            </div>

            <button onClick={() => setOpenSave(true)}>Save</button>
            <SaveEntry open={openSave} inputType="BrainDump" title={title} userInput={userInput} onClose={() => setOpenSave(false)}/>
                     
        </>
    )
}


export function DailyChallenge(){
    // const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const [userInput, setUserInput] = useState('');
    const [generatedID, setGeneratedID] = useState ('');
    const [openSave, setOpenSave] = useState(false);
    const {user} = UserAuth();
    const userID = user.uid;

    useEffect(() => {
        generateUniquePromptID();
    }, []);

    useEffect(() => {
        // calling function we just wrote, cuz otherwise they won't work 
        generatePrompt(); // generate ID
    }, [generatedID]); //running UseEffect every time, when generatedID changes

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

    return(
        <>
            <div>
                <div>
                    <h2>{prompt}</h2>
                    <p>{currentDate()}</p>
                    <input type="text" value={userInput} onChange={(e => setUserInput(e.target.value))} placeholder="What is it you're thinking of..."/>
                </div>
                <button onClick={() => setOpenSave(true)}>Save</button>
                <SaveEntry open={openSave} inputType="DailyChallenge" title={prompt} userInput={userInput} promptID={generatedID} onClose={() => setOpenSave(false)}/>

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