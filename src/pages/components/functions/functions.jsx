import { useEffect, useState } from "react";
import { database } from "../../../../firebase-config";
import { ref, onValue } from "firebase/database";
import { UserAuth } from "../../../authentication/context/AuthContext";

export function GetUser(userId) {
    const [user, setUser] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        // Path to find user by ID in RealtimeDatabase
        const userRef = ref(database, `users/${userId}`);
  
        // When user on userRef path is met, snapshot creates object "data" (our user)
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
  
          if (data) {
            setUser(data);
          }
        });
      };
      fetchData();
    }, [userId]);
  
    return user;
  }


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
