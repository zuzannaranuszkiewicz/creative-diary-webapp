import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { UserAuth } from "../../authentication/context/AuthContext";
import { GetProjects } from "./Projects";
import { GetTags } from "./Tags";


export function EntryCard({entry}){
    const { user } = UserAuth();
    // navigate to "entry" page after clicking on it
    const navigate = useNavigate();
    const [projectNames, setProjectNames] = useState([]);
    const [tagNames, setTagNames] = useState([]);
    const projects = GetProjects(user.uid);
    const tags = GetTags(user.uid);

    
    

    useEffect(() => {
        if (entry.projects && entry.projects.length > 0) { 
            const mappedProjects = entry.projects.map((projectId) => { 
                const project = projects.find((e) => e.id === projectId); // (e) is a single project, e.id is an ID of this single project
                return project ? project.name : " "; // returning the name of the project if it exists, otherwise returning an empty string
            });
            setProjectNames(mappedProjects);
        }
    }, [entry.projects, projects]); 
    
    useEffect(() => {
        if (entry.tags && entry.tags.length > 0) { 
            const mappedTags = entry.tags.map((tagId) => { 
                const tag = tags.find((e) => e.id === tagId); // (e) is a single project, e.id is an ID of this single project
                return tag ? tag.name : " "; // returning the name of the project if it exists, otherwise returning an empty string
            });
            setTagNames(mappedTags);
        }
    }, [entry.projects, projects]);// dependencies array that triggers the effect every time when 'entry.projects' or 'projects' change
    

    function handleClick(){
        navigate(`/${entry.id}`)
    }

    return(
              <div key={entry.id} className="entryCard">
                <h2>{entry.inputType}</h2>
                <p>{entry.title}</p>
                <p>{new Date(entry.timestamp).toLocaleDateString('en-GB')}</p>
                <p>{entry.text}</p>

                {/* Render tags */}
                {tagNames && tagNames.length > 0 && (
                    <div>
                        Tags: {tagNames.tags.join(", ")}
                    </div>
                )}

                {/* Render projects */}
                {projectNames && projectNames.length > 0 && (
                <div>
                    Projects: {projectNames.join(", ")}
                </div>
                )}

              </div>
            );
}

export function EntryPreview(){
    
}