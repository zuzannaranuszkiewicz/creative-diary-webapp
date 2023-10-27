import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";

export default function Library(){
    
    return(
        <>
        <SideBar/>
            <h1>Library</h1>

            <div className="searchBar">
                <input type="text" />

                <button value="BrainDump">Brain Dump</button>
                <button value="BrainDump">Brain Dump</button>
                <button value="BrainDump">Brain Dump</button>

            </div>

            <section>
                <div>
                    <h2>Brain Dump</h2>
                    <EntryGroup inputType={"BrainDump"}/>
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