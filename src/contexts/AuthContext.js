import { createContext, useState, useContext, useEffect } from "react"
import { auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
    }
    const logout = () => {
        signOut(auth)

    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

