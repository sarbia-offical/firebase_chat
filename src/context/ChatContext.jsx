/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-06-05 18:42:32
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 23:02:10
 */
import { createContext, useContext, useReducer } from "react";
import { userContext } from "../context/AuthContext";
export const chatContext = createContext();
export const ChatContextProvider = ({children}) => {
    const { user: currentUser } = useContext(userContext);
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
  
        default:
          return state;
      }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    return (
        <chatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </chatContext.Provider>
    )
}