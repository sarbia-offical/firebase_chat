/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-06-02 22:18:11
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-03 23:34:48
 */
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
export const userContext = createContext({
    user: {}
});
export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
        return () => {
            unSub();
        }
    }, [])
    return (
        <userContext.Provider value={{user}}>
            {children}
        </userContext.Provider>
    )
};