import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
export const FirebaseContext = createContext(null);



export const AuthContext = createContext(null);



export default function Context  ({children})  {
    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          setUser(user)
        });
      });
    

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}