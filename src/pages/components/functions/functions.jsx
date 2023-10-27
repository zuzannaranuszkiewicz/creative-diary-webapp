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


