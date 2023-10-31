import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { useParams } from "react-router-dom";

export function GroupPage() {
    console.log(props);
    const {} = useParams();
    const {inputType, tagID, tagName} = param; 

    return (
        <>
        <SideBar/>
        <h2>library/{inputType || tagName}</h2>
        <EntryGroup inputType={inputType} tagID={tagID}/>
        </>
    )
}


export function ProjectPage(props){
    const {projectID, projectName} = props; 
    
    return(
        <>
            <SideBar/>
            <h2>library/projects/{projectName}</h2>
            <EntryGroup projectID={projectID}/>
        </>
    )
}