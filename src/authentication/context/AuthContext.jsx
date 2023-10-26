import React, { useEffect, useState, createContext, useContext }  from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../firebase-config';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <UserContext.Provider value={ {user} }>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
     return useContext(UserContext)
}
