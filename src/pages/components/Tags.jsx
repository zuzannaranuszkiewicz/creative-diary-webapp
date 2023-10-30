import { useState } from "react";
import { UserAuth } from "../../authentication/context/AuthContext";
import { database } from "../../../firebase-config";
import { push, ref, set } from "firebase/database";

export function GetTags(){
    
}

export function SaveTag(){
    // getting new key ID for new BrainDump
    const newTag = push(ref(database, 'tags/' + userID));

    //uploading BrainDump data to database
    set(newTag, {
        name: name,
    });

    // confirmation
    alert("Tag saved!");
}


export function AddTag(){
    const [name, setName] = useState('');

    return(
        <> 
        <div>
            <input type="text" value={name} onChange={(e => setName(e.target.value))}>#</input>
        </div>
        </>
    )
}

