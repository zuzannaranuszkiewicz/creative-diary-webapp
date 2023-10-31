import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { AddProject, ProjectGroup } from "./components/Projects";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Library(){
    const navigate = useNavigate('');
    const [openModal, setOpenModal] = useState(false);

    function handleClick(inputType){
        navigate(`/group/${inputType}`)
    }


    return(
        <>
        <SideBar/>
            <h1>Library</h1>

            <div className="searchBar">
                <input type="text" />

                <button value="BrainDump" onClick={() => handleClick("BrainDump")}>Brain Dump</button>
                <button value="DailyChallenge" onClick={() => handleClick("DailyChallenge")}>Daily Challenge</button>
                <button value="CreativityBooster"onClick={() => handleClick("CreativityBooster")} >Creativity Booster</button>

            </div>

            <section className="allgroups">
                <div>
                    <h2>Brain Dump</h2>
                    
                    <EntryGroup inputType={"BrainDump"}/>
                </div>

                <div>
                    <h2>Projects</h2>
                    <ProjectGroup/>
                    <button onClick={() => setOpenModal(true)}>+</button>
                    <AddProject open={openModal} onClose={() => setOpenModal(false)}/>
                </div>
                
                <div>
                    <h2>Daily Challenge</h2>
                    <EntryGroup inputType={"DailyChallenge"}/>
                </div>

                <div>
                    <h2>Creativity Booster</h2>
                    <EntryGroup inputType={"CreativityBooster"}/>
                </div>
            </section>
        </>
    )
}