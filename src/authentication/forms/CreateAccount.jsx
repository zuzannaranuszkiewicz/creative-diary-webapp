import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { database } from "../../../firebase-config";
import { ref, set } from "firebase/database";

export default function CreateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    async function writeUserData(userID, email) {
        set(ref(database, 'users/' + userID), {
          email: email,
        });
      }

    function SignUp(e){
        //prevents automatic auction of Submit button (refreshing page)
        e.preventDefault(); 
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            writeUserData(userCredential.user.uid, email);
        })
        .catch((error) =>{
            console.log(error);
        });
    }


    return(
        <section>
            <h1>Create Account</h1>
            <form onSubmit={SignUp}>
                <label >E-mail:</label>
                <input 
                    type='email' 
                    value={email} 
                    onChange={(e => setEmail(e.target.value))}
                    placeholder="your@email.com"/>

                <label >Password: </label>
                <input 
                type='password' 
                value={password}
                onChange={(e => setPassword(e.target.value))}
                placeholder="Your password"/>

                <button type="submit">Create Account</button>
            </form>
        </section>
    )

}