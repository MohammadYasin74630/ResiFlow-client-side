import { createContext, useEffect, useState } from "react"
import auth from "./firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope('email');
    const githubProvider = new GithubAuthProvider();

    const register = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserInfo = (name, image) => {

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        });
    }

    const forgotPassword = (email) => {

        return sendPasswordResetEmail(auth, email);
    }

    const googleLogin = () => {

        return signInWithPopup(auth, googleProvider);
    }

    const githubLogin = () => {

        return signInWithPopup(auth, githubProvider);
    }

    const logout = () => {

        return signOut(auth);
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (user) {
                const email = user.email || user.providerData[0].email;

                const { data: { token } } = await axiosPublic.post(`/jwt/${email}`)
                if (token) localStorage.setItem("token", token)

                if (user.email) {
                    setUser(user)
                } else {
                    setUser(() => ({ ...user, email: user?.providerData[0]?.email }));
                }
            } else {
                localStorage.removeItem("token")
                setUser(user);
            }

            if (loading) { setLoading(false) }
        });

        return () => unsubscribe
    }, []);

    const authInfo = {
        user,
        loading,
        setUser,
        register,
        login,
        updateUserInfo,
        forgotPassword,
        logout,
        googleLogin,
        githubLogin
    }

    return (
        <>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </>
    )
}

export default AuthProvider