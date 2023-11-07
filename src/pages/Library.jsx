import { EntryGroup, LastThreeEntries } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { AddProject, ProjectGroup } from "./components/Projects";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SearchBar } from "./components/SearchBar";

export default function Library(){
    const navigate = useNavigate('');
    const [openModal, setOpenModal] = useState(false);

    function handleClick(inputType){
        navigate(`/group/${inputType}`)
    }

    function handleProjectClick(inputType){
        navigate(`/projects`)
    }

    return(
        <>
        <SideBar/>
            <h1>Library</h1>

            <div className="searchBar">
                <SearchBar/>

            </div>

            <section className="allgroups">
                <div>
                    <h2>Pinned</h2>
                    <EntryGroup pinned={true}/>
                </div>


                <div>
                    <h2>Brain Dump</h2>
                    <a onClick={() => handleClick("BrainDump")}>see all</a>
                    <LastThreeEntries inputType={"BrainDump"}/>
                </div>

                <div>
                    <h2>Projects</h2>
                    <a onClick={() => handleProjectClick()}>see all</a>
                    <ProjectGroup lastThree/>
                    <button onClick={() => setOpenModal(true)}>+</button>
                    <AddProject open={openModal} onClose={() => setOpenModal(false)}/>
                </div>
                
                <div>
                    <h2>Daily Challenge</h2>
                    <a onClick={() => handleClick("DailyChallenge")}>see all</a>

                    <LastThreeEntries inputType={"DailyChallenge"}/>
                </div>

                <div>
                    <h2>Creativity Booster</h2>
                    <a onClick={() => handleClick("CreativityBooster")} >see all</a>

                    <LastThreeEntries inputType={"CreativityBooster"}/>
                </div>
            </section>
        </>
    )
}