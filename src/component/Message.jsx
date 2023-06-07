/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:46:34
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 23:52:18
 */
import { useContext, useEffect, useRef } from "react";
import { userContext } from "../context/AuthContext";
import "../styles/message.scss";
import { chatContext } from "../context/ChatContext";

const Message = ({message}) => {
  const { user: currentUser } = useContext(userContext);
  const { data } = useContext(chatContext);
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView({behavior: 'smooth'})
  },[])
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        {
          message.text && <p>{message.text}</p>
        }
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
