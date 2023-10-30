import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { AddProject, ProjectGroup } from "./components/Projects";
import { useState } from "react";

export default function Library(){
    const [openModal, setOpenModal] = useState(false);

    return(
        <>
        <SideBar/>
            <h1>Library</h1>

            <div className="searchBar">
                <input type="text" />

                <button value="BrainDump">Brain Dump</button>
                <button value="DailyChallenge">Daily Challenge</button>
                <button value="CreativityBooster">Creativity Booster</button>

            </div>

            <section>
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