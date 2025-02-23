import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    signOut} from "firebase/auth";
import auth from "../firebase/firebase.confige";

export const authContext = createContext()

const AuthProvider = ({routes}) => {

    const googleProvider = new GoogleAuthProvider()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

const handleRegister = (email, password)=>{
   return createUserWithEmailAndPassword(auth, email, password)
}
const handleLogin =(email,password)=>{
    return signInWithEmailAndPassword(auth, email, password)
}
const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider)
}
const manageProfile = (name,image)=>{
    updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:image
    })
}
const handleLogout = () => {
    signOut(auth);
}

const authInfo = {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    user,
    setUser,
    loading,
    manageProfile
}


useEffect(()=>{
const nonRegister = onAuthStateChanged(auth,(currentUser)=>{
    if(currentUser){
        setUser(currentUser)
    }
    else{
        setUser(null)
    }
    setLoading(false)

    return()=>{
        nonRegister()
    }
})
},[])


    return (
        <div>
           <authContext.Provider value={authInfo}>
            {routes}
            </authContext.Provider>
        </div>
    );
};

export default AuthProvider;