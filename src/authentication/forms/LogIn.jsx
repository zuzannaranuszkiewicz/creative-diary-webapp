import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";

export default function LogIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 

    function SignIn(e){
        //prevents automatic auction of Submit button (refreshing page)
        e.preventDefault(); 
        console.log("You're in!");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential); 
            console.log("You're in!");
        })
            .catch((error) =>{
                console.log(error);
            })
    }


    return(
        <section>
            <h1>Log In</h1>
            <form onSubmit={SignIn}>
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

                <button type="submit">Log In</button>
            </form>
        </section>
    )

}