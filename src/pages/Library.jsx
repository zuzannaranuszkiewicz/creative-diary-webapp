import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";


export default function Library(){
    
    return(
        <>
        <SideBar/>
            <h1>Library</h1>
            <section>
                <EntryGroup/>
            </section>
        </>
    )
}