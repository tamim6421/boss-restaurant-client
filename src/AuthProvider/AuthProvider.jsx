import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
 
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    

    const auth = getAuth (app)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut =() =>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) =>{
        return updateProfile( auth.currentUser, {
            displayName: name ,
            photoURL: photo,
        })
    }

    useEffect( () =>{
        const unSubscribe = onAuthStateChanged( auth, createUser => {
            setUser(createUser)
            console.log(createUser)
            setLoading(false)
        })
        return () =>{
            unSubscribe()
        }
    } ,[] )

    const authInfo = {user, loading, createUser, signInUser, logOut, updateUserProfile}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
