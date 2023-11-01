import { UserAuth } from "../authentication/context/AuthContext";
import { EntryGroup } from "./components/EntryGroup";
import { GetProjects } from "./components/Projects";
import { SearchBar } from "./components/SearchBar";
import { SideBar } from "./components/SideBar";
import { useParams } from "react-router-dom";

export function GroupPage() {
    const {inputType} = useParams();
    return (
        <>
        <SideBar/>
        
        <SearchBar inputType={inputType}/>
        <h2>library/{inputType}</h2>
        <EntryGroup inputType={inputType}/>
        </>
    )
}

export function TagsPage() {
    const {tagID, tagName} = useParams();
    console.log(tagName,tagID);
    return (
        <>
        <SideBar/>

        <SearchBar tag={tagID}/>
        <h2>library/{tagName}</h2>
        <EntryGroup tags={tagID}/>
        </>
    )
}


export function ProjectPage(){
    const {user} = UserAuth();
    const projects = GetProjects(user.uid);
    const {projectName, projectID} = useParams(); 

    const project = projects.find((p) => p.id === projectID);

    if (!project) {
        return <div>Loading...</div>; // Add a loading indicator if the project is not found cuz it takes some time to load everything
      }


    return(
        <>
            <SideBar/>
            <SearchBar project={projectID}/>
            {/* <SearchBar project={projectID}/> */}
            <h2>library/projects/{projectName}</h2>
            {project.goal && (<p>{project.goal}</p>)}
            {project.description && (<p>{project.description}</p>)}

            <EntryGroup projects={projectID}/>
        </>
    )
}