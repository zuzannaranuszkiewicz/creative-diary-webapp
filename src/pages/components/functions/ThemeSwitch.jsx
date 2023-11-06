import { createContex, useContext, useState } from "react";
import { database } from "../../../../firebase-config"
import { onValue, ref } from "firebase/database";

function getThemePreference(userID){
    const [theme, setTheme] = useState();
    const themeRef = ref(database, `users/${userID}/theme`);

    onValue(themeRef, (snapshot) => {
        setTheme(snapshot.val())
    })

    return theme;
}

export function switchTheme(){
    //read user's preferences from database and set roots class as user prefers
    return
}