import { useThemeProps } from "@mui/material";
import { EntryGroup } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import { useParams } from "react-router-dom";

export function GroupPage() {
    const {inputType, tagID, tagName} = useParams();

    return (
        <>
        <SideBar/>
        <h2>library/{inputType || tagName}</h2>
        <EntryGroup inputType={inputType} tags={tagID}/>
        </>
    )
}


export function ProjectPage(){
    const {projectName, projectID} = useParams(); 
    console.log(projectName, projectID)
    return(
        <>
            <SideBar/>
            <h2>library/projects/{projectName}</h2>
            <EntryGroup projects={projectID}/>
        </>
    )
}