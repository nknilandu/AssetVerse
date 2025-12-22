import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // create user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // reset password
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // log out user
  const logOut = () => {
    return signOut(auth);
  };

  // update user
  const updateUserProfile = (profileData) => {
    return updateProfile(auth.currentUser, profileData)
  }

  // observe
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

    useEffect(() => {
      if (user) {
        fetch(`https://asset-verse-server-chi.vercel.app/users?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setUserRole(data.role || null);
          });
      }
    }, [user]);

  const authData = {
    createUser,
    loginUser,
    forgotPassword,
    logOut,
    user,
    setUser,
    loading,
    updateUserProfile,
    userRole, 
    setUserRole
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
