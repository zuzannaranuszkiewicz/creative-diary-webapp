import { UserAuth } from "../../authentication/context/AuthContext";
import { useEffect, useState } from "react";
import { database } from "../../../firebase-config";
import { ref, onValue } from "firebase/database";
import { EntryCard } from "./Entry";


function GetEntries(userId) {
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
            inputType: value.inputType,
            text: value.text,
            timestamp: value.timestamp,
            title: value.title,
          }));
          setEntries(entriesArray);
        }
      });
    };
    fetchData();
  }, [userId]);

  return entries;
}

function filterEntries(entries, filters) {
  const { keywords, date, inputType } = filters;
  if (!keywords && !date && !inputType) {
    return entries; // Return all entries if no filters are provided
  }
  return entries.filter((entry) => {
    // Filter by keywords (searching for the same words in title and text)
    if (keywords && (entry.title.includes(keywords) || entry.text.includes(keywords))) {
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
    return false;
  });
}


export function EntryGroup(props){
  const { user } = UserAuth();
  const { keywords, date, inputType } = props; // Destructure the props
  const entries = GetEntries(user.uid);
  let filteredEntries = entries;

  if (keywords || date || inputType) {
    filteredEntries = filterEntries(entries, { keywords: keywords, date: date, inputType: inputType });
  }

  return (
    <div>
      {filteredEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

