import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { UserAuth } from "../../authentication/context/AuthContext";
import { GetProjects } from "./Projects";
import { GetTags } from "./Tags";
import { database } from "../../../firebase-config";
import { ref, set, update } from "firebase/database";



export function EntryCard({entry}){
    const { user } = UserAuth();
    const projects = GetProjects(user.uid);
    const tags = GetTags(user.uid);
    // navigate to "entry" page after clicking on it
    const navigate = useNavigate();
    const [projectNames, setProjectNames] = useState([]);
    const [tagNames, setTagNames] = useState([]);
    


    useEffect(() => {
        if (entry.projects && entry.projects.length > 0) { 
            const mappedProjects = entry.projects.map((projectId) => { 
                const project = projects.find((e) => e.id === projectId); // (e) is a single project, e.id is an ID of this single project
                return project ? { id: projectId, name: project.name } : ""; // returning the name of the project if it exists, otherwise returning an empty string
            });
            setProjectNames(mappedProjects);
        }
    }, [entry.projects, projects]); 
    

    useEffect(() => {
        if (entry.tags && entry.tags.length > 0) {
            const mappedTags = entry.tags.map((tagId) => { 
                const tag = tags.find((a) => a.id === tagId); 
                return tag ? { id: tagId, name: tag.name } : ""; 
            });
            setTagNames(mappedTags);
        }
    }, [entry.tags, tags]);// dependencies array that triggers the effect every time when 'entry.projects' or 'projects' change
    
    
    function handleTagClick(tag) {
        const tagName = tag.name;
        const tagID = tag.id;
        if (tag) {
            navigate(`/tags/${tag.id}/${tag.name}`);
        }
    }

    function handleProjectClick(project) {
        if (project) {
            navigate(`/projects/${project.name}/${project.id}`);
        }
    }

    function pinEntry() {
        const entryRef = ref(database, `entries/${user.uid}/${entry.id}`);
      
        if (entry.pinned === true) {
          update(entryRef, {
            pinned: null
          });
          alert("Entry unpinned!");
        } else {
          update(entryRef, {
            pinned: true
          });
          alert("Entry pinned!");
        }
      }
    


    return(
              <div key={entry.id} className="entryCard">
                <h3>{entry.inputType}</h3>
                <p>{entry.title}</p>
                <p>{new Date(entry.timestamp).toLocaleDateString('en-GB')}</p>
                <p>{entry.text}</p>

                <p onClick={pinEntry}>{entry.pinned ? 'Pinned' : 'Pin'}</p>

                {/* Render tags as buttons */}
                {entry.tags && (
                <div>
                    Tags:{" "}
                    {tagNames.map((tag, index) => (
                    <button key={index} onClick={() => handleTagClick(tag)}>
                        {tag.name}
                    </button>
                    ))}
                </div>
                )}

                {/* Render projects as buttons */}
                {entry.projects &&(
                <div>
                    Projects:{" "}
                    {projectNames.map((project, index) => (
                    <button key={index} onClick={() => handleProjectClick(project)}>
                        {project.name} {/* Render the 'name' property of the project */}
                    </button>
                    ))}
                </div>
                )}

              </div>
            );
}

export function EntryPreview(){
    
}