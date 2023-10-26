import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { database } from "../../../firebase-config";
import { ref, set } from "firebase/database";

export default function CreateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    async function writeUserData(userID, email, username) {
        set(ref(database, 'users/' + userID), {
            username: username,
            email: email,
        });
      }

    function SignUp(e){
        //prevents automatic auction of Submit button (refreshing page)
        e.preventDefault(); 
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            writeUserData(userCredential.user.uid, email, username);
            navigate('/dashboard');
            // navigate user to dashboard with UseNAvigate
        })
        .catch((error) =>{
            console.log(error);
        });
    }

    return(
        <section>
            <h1>Create Account</h1>
            <form onSubmit={SignUp}>
                <label >Name:</label>
                <input 
                    type='text' 
                    value={username} 
                    onChange={(e => setUsername(e.target.value))}
                    placeholder="Jane Doe"/>

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