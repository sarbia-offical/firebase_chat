/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:46:02
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-06 17:12:12
 */
import "../styles/chat.scss"
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { chatContext } from "../context/ChatContext";
import { useContext } from "react";

const Chat = () => {
  const { data } = useContext(chatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{ data.user.displayName }</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;