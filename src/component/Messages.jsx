/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:46:43
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 23:11:29
 */
import "../styles/messages.scss";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import {db} from "../firebase";
import { chatContext } from "../context/ChatContext";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(chatContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <div className="messages">
        {
          messages.length >0 && messages.map((m) => (
            <Message message={m} key={m.id} />
          ))
        }
    </div>
  );
};

export default Messages;
