import { EntryGroup } from "./components/EntryGroup";

export function GroupPage(props) {

    const {inputType, tagID, tagName} = props; 

    return (
        <>
        <h2>library/{inpuptType || tagName}</h2>
        <EntryGroup inputType={inputType} tagID={tagID}/>
        </>
    )
}


export function ProjectPage(props){
    const {projectID, projectName} = props; 
    
    return(
        <>
            <h2>library/projects/{projectName}</h2>
            <EntryGroup projectID={projectID}/>
        </>
    )
}