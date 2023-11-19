import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from './../Hooks/useAxiosPublic';
 
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    

    const auth = getAuth (app)

    const googleProvider = new GoogleAuthProvider()
    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


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
        const unSubscribe = onAuthStateChanged( auth, currentUser => {
            setUser(currentUser)
            console.log('current user',currentUser)

            if(currentUser){
            const userInfo = {email: currentUser.email}
            axiosPublic.post(`/jwt`, userInfo)
            .then(res =>{
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token)
                }
            })
            }
            else{
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () =>{
           return unSubscribe()
        }
    } ,[axiosPublic] )

 
    const authInfo = {user, loading, createUser, signInUser, logOut, updateUserProfile, googleSignIn}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
