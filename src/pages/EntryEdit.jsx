import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, update, onValue } from "firebase/database";
import { database } from "../../firebase-config";
import { UserAuth } from "../authentication/context/AuthContext";
import { SelectProject } from "./components/Projects";
import { SelectTag } from "./components/Tags";


export function GetOneEntry(userID, entryID) {
    const [entry, setEntry] = useState(null);
  
    useEffect(() => {
      const entryRef = ref(database, `entries/${userID}/${entryID}`);

      console.log(entryRef);
  
      onValue(entryRef, (snapshot) => {
        const data = snapshot.val();
  
        if (data) {
          setEntry({
            ...data,
          });
        }
      });
    }, [userID, entryID]);
  
    
    return entry;
  }


export function EntryEdit() {
  const { entryID } = useParams();
  const { user } = UserAuth();
  const userID = user.uid;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const entry = GetOneEntry(userID, entryID);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setText(entry.text);
      setSelectedProjects(entry.projects || []);
      setSelectedTags(entry.tags || []);
      setLoading(false); // Set loading to false once data has been fetched
    }
  }, [entry]);

  const handleEntryUpdate = () => {
    const entryRef = ref(database, `entries/${userID}/${entryID}`);
    update(entryRef, {
      title: title,
      text: text,
      projects: selectedProjects,
      tags: selectedTags,
    });
    alert("Entry updated!");
    navigate("/dashboard"); // Adjust the route as needed
  };

  return (
    <div className="entryEdit">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
      />

    {!loading && (
            <div>
            <p>Tags:</p>
            <SelectTag
                onTagSelect={setSelectedTags}
                selectedTags={selectedTags}
            />

            <p>Projects:</p>
            <SelectProject
                onProjectSelect={setSelectedProjects}
                selectedProjects={selectedProjects}
            />
            </div>
        )}

      <button onClick={handleEntryUpdate}>Update Entry</button>
    </div>
  );
}











// export function EntryEdit(){
//     const entryID = useParams();
//     console.log(entryID);
//     const {user} = UserAuth();
//     const [title, setTitle] = useState('');
//     const [text, setText] = useState('');
    
//     const entriesArray = GetEntries(user.id);


//     function updateEntry(){
//         const entryRef = ref(database, 'entries/' + user.id + '/' + entry.id);

//         //uploading BrainDump data to database
//         const entryData = {
//             text: text
//         };
//         if (inputType) {
//             entryData.inputType = inputType;
//         }
//         if (title) {
//             entryData.title = title;
//         }
        
//         if (selectedProjects && selectedProjects.length > 0) {
//             entryData.projects = selectedProjects;
//         }
        
//         if (selectedTags && selectedTags.length > 0) {
//             entryData.tags = selectedTags;
//         }

//         update(newEntry, entryRef);

//         // confirmation
//         alert("Entry updated!");
//         // navigate to ChooseInputType component
        
//     }
  

//     return(
//         <div className="">
//             <div key={entry.id} className="entryDisplay">
//                 <button>x</button>
//                 <button onClick={()=>{updateEntry()}}>Save</button>


//                 <input type="text" value={entry.title} onChange={(e => setTitle(e.target.value))}/>
//                 <p>{new Date(entry.timestamp).toLocaleDateString('en-GB')}</p> 
//                 <input type="text" value={entry.text} onChange={(e => setText(e.target.value))}/>



//                 {/* embed for spootify, musze wykombinowac modal do dodawania linkow do piosenek */}
//                 {/* <iframe
//                 style={{ borderRadius: "12px", width: "100%", height: "152px"}}
//                 src="https://open.spotify.com/embed/track/3fpVWegR6YOS1Yk5HSMYIq?utm_source=generator&theme=0"
//                 frameBorder="0"
//                 allowFullScreen
//                 allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//                 loading="lazy"
//                 ></iframe> */}

//                 <p>{entry.text}</p>

//                 <p onClick={() => pinEntry(entry, user)}>{entry.pinned === "true" ? 'Pinned' : 'Pin'}</p>

//                 {/* Render tags as buttons */}
//                 {entry.tags && (
//                 <div>
//                     Tags:{" "}
//                     {tagNames.map((tag, index) => (
//                     <button key={index} onClick={() => handleTagClick(tag)}>
//                         {tag.name}
//                     </button>
//                     ))}
//                 </div>
//                 )}

//                 {/* Render projects as buttons */}
//                 {entry.projects &&(
//                 <div>
//                     Projects:{" "}
//                     {projectNames.map((project, index) => (
//                     <button key={index} onClick={() => handleProjectClick(project)}>
//                         {project.name} {/* Render the 'name' property of the project */}
//                     </button>
//                     ))}
//                 </div>
//                 )}


//             </div>
//         </div>
//     )
// }