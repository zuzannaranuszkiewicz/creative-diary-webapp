import { UserAuth } from "../../authentication/context/AuthContext";
import { database } from "../../../firebase-config";
import { useState, useEffect } from "react";
import { push, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom"

export function GetProjects(userId) {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
      // path to find projects array in RealtimeDatabase
        const projectsRef = ref(database, `projects/${userId}`);
  
        onValue(projectsRef, (snapshot) => {
          const data = snapshot.val();
  
          if (data) {
          // our "data" is mapped into array, which allows us read keys (inputType, timestamp, title), and assigned to them values ("BrainDump", day when entry was created, entry) 
            const projectsArray = Object.entries(data).map(([key, project]) => ({
              id: key,
              name: project.name,
              goal: project.goal,
              timestamp: project.timestamp,
              description: project.description,
            }));
            setProjects(projectsArray);
          }
        });
      };
      fetchData();
    }, [userId]);
    
    return projects;    
  }


  export function SelectProject({ onProjectSelect, selectedProjects }) {
    const { user } = UserAuth();
    const projects = GetProjects(user.uid);

    const [internalSelectedProjects, setInternalSelectedProjects] = useState(selectedProjects || []);

    // It toggles the selection of a project by adding or removing its ID from the selectedProjects array.
    const handleProjectSelect = (projectId) => {
        const updatedSelectedProjects = internalSelectedProjects.includes(projectId)
            ? internalSelectedProjects.filter((id) => id !== projectId)
            : [...internalSelectedProjects, projectId];
    
        setInternalSelectedProjects(updatedSelectedProjects);
        onProjectSelect(updatedSelectedProjects);
    };
    
    return (
        <div>
            {projects.map((project) => (
                <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    style={{
                        backgroundColor: internalSelectedProjects.includes(project.id) ? 'green' : 'gray',
                        color: 'white',
                        margin: '5px',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                >
                    {project.name}
                </button>
            ))}
        </div>
    );
    
}



export function ProjectGroup(){
    const { user } = UserAuth();
    const projects = GetProjects(user.uid);
  
    return (
      <div>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project}/>
        ))}
      </div>
    );
}


export function ProjectCard({project}){
    const navigate = useNavigate();

    function handleProjectClick(project) {
        if (project) {
            navigate(`/projects/${project.name}/${project.id}`);
        }
    }
    
    return(
        <div key={project.id} className="projectCard" onClick={() => handleProjectClick(project)}
                style={{
                    // Changes button style based on whether the project is selected or not.
                    backgroundColor:'gray',
                    color: 'white',
                    margin: '5px',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: "pointer",
                }}>
            <p>{project.timeperiod}</p>
            <h2>{project.name}</h2>
        </div>

    )
}



export function AddProject({open, onClose}){
    if (!open) return null;
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('')
    
    const {user} = UserAuth();
    const userID = user.uid;
    
    function SaveProject(){
        // getting new key ID for new BrainDump
        const newProject = push(ref(database, 'projects/' + userID));
    
        //uploading BrainDump data to database
        set(newProject, {
            name: name,
            goal: goal,
            description: description
        });
    
        // confirmation
        alert("Project saved!");
        onClose();
    }

    return(
        <> 
        <div className="overlay" onClick={onClose}>
        {/* stopPropagation function prevents affecting onClose function from 'overlay' div to its children div's, so pop-up itself */}
        <div className="popUp" onClick={(e => {e.stopPropagation();})}>
                <button onClick={onClose}>x</button>
                <h2>Add a Project</h2>
                <div>
                    <label>Project Name<span>*</span></label>
                    <input type="text" value={name} onChange={(e => setName(e.target.value))} placeholder="e.g. Photography Funsies" required/>

                    <label>Project Goal</label>
                    <input type="text" value={goal} onChange={(e => setGoal(e.target.value))} placeholder="e.g. Creating a Portfolio"/>

                    <label>Project Description</label>
                    <input type="text" value={description} onChange={(e => setDescription(e.target.value))} placeholder="In this project I would like to.."/>

                    <button onClick={SaveProject}>Save</button>
                </div>
            </div>
        </div>
    
        </>
    )
}