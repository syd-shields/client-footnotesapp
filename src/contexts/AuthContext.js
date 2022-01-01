import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utilities/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "@firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login: () => Promise,
  logout: () => Promise, 
  signInWithGoogle: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
          setCurrentUser(user)
      })
      return () => {
          unsubscribe()
      }
  }, [])

  const value = {
    currentUser,
    register,
    login,
    logout,
    signInWithGoogle
  };

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider)
  }
  function logout() {
      return signOut(auth)
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
