/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:48:10
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 23:39:33
 */
import { useContext, useEffect, useState } from "react";
import "../styles/chats.scss";
import { userContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { chatContext } from "../context/ChatContext";

const Chats = () => {
  const { user: currentUser } = useContext(userContext);
  const { data, dispatch } = useContext(chatContext);
  const [chats, setChats] = useState(null);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });    
      return () => {
        unsub();
      }
    }
    currentUser.uid && getChats();
  }, [currentUser.uid])
  const handleSelect = (info) => {
    dispatch({type: 'CHANGE_USER', payload: info  });
  }
  return (
    <div className="chats">      
      {
        (
          chats && Object.keys(chats).length > 0 ? Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => { handleSelect(chat[1].userInfo) }}
            >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
          )) : 
          <div className="noLatestMessage">
            <p>no latest message</p>
          </div>
        )
      }
     </div>
  )
};

export default Chats;
