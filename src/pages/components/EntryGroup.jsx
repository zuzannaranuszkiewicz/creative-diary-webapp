import { UserAuth } from "../../authentication/context/AuthContext";
import { useEffect, useState } from "react";
import { database } from "../../../firebase-config";
import { ref, onValue } from "firebase/database";
import { EntryCard } from "./Entry";


export function GetEntries(userId) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    // path to find entries created by logged-in user in RealtimeDatabase
      const entriesRef = ref(database, `entries/${userId}`);

    //when entries on entriesRef path are met, shapshot creates object "data" (our entries))
      onValue(entriesRef, (snapshot) => {
        const data = snapshot.val();


        if (data) {
        // our "data" is mapped into array, which allows us read keys (inputType, timestamp, title), and assigned to them values ("BrainDump", day when entry was created, entry) 
          const entriesArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            pinned: value.pinned,
            inputType: value.inputType,
            text: value.text,
            timestamp: value.timestamp,
            title: value.title,
            projects: value.projects,
            tags: value.tags
          }));
          setEntries(entriesArray);
        }
      });
    };
    fetchData();
  }, [userId]);

  // console.log(entries);
  return entries;
}


function filterEntries(entries, filters) {
  const { pinned, keywords, date, inputType, tags, projects } = filters;
  if (!pinned && !keywords && !date && !inputType && !tags && !projects) {
    return entries; // Return all entries if no filters are provided
  }
  return entries.filter((entry) => {
    if (pinned && entry.pinned && entry.pinned === true){
      return true;
    }
    // Filter by keywords (searching for the same words in title and text)
    if (
      keywords &&
      (entry.title && entry.title.includes(keywords)) ||
      (entry.text && entry.text.includes(keywords))
    ) {
      return true;
    }
    // Filter by date (timestamp)
    if (date && new Date(entry.timestamp).toLocaleDateString('en-GB') === date) {
      return true;
    }
    // Filter by inputType
    if (inputType && entry.inputType === inputType) {
      return true;
    }
    if (tags && entry.tags && entry.tags.includes(tags)) {
      return true;
    }
    if (projects && entry.projects && entry.projects.includes(projects)) {
      return true;
    }
    return false;
  });
}

//RIGID FILTERING (excludes every entry that does not match) for library and pinned
// function filterEntries(entries, filters) {
//   return entries.filter((entry) => {
//     const matchedPinned = filters.pinned !== null ? entry.pinned === filters.pinned : true;
//     const matchedKeywords = filters.keywords
//       ? entry.title.toLowerCase().includes(filters.keywords.toLowerCase()) ||
//         entry.content.toLowerCase().includes(filters.keywords.toLowerCase())
//       : true;
//     const matchedDate = filters.date
//       ? new Date(entry.timestamp).toLocaleDateString('en-GB') === filters.date
//       : true;
//     const matchedInputType = filters.inputType ? entry.inputType === filters.inputType : true;
//     let matchedTags = true;
//     let matchedProjects = true;

//     if (Array.isArray(filters.tags)) {
//       matchedTags = filters.tags.every(tag => entry.tags && entry.tags.includes(tag));
//     } else if (typeof filters.tags === 'string') {
//       matchedTags = entry.tags && entry.tags.includes(filters.tags);
//     }

//     if (Array.isArray(filters.projects)) {
//       matchedProjects = filters.projects.every(project => entry.projects && entry.projects.includes(project));
//     } else if (typeof filters.projects === 'string') {
//       matchedProjects = entry.projects && entry.projects.includes(filters.projects);
//     }

//     return matchedPinned && matchedKeywords && matchedDate && matchedInputType && matchedTags && matchedProjects;
//   });
// }


export function EntryGroup(props){
  const { user } = UserAuth();
  const entries = GetEntries(user.uid);

  const { pinned, keywords, date, inputType, tags, projects } = props; // Destructure the props
  let filteredEntries = entries;

  if ( pinned || keywords || date || inputType || tags || projects) {
    filteredEntries = filterEntries(entries, { keywords: keywords, date: date, inputType: inputType, tags: tags, projects: projects });
  }

  return (
    <div>
      {filteredEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

