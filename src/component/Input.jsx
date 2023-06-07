/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:46:22
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-06 17:16:15
 */
import "../styles/input.scss"
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useState, useContext } from "react";
import { userContext } from "../context/AuthContext";
import { chatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Input = () => {
  const [text, setText] = useState("");
  const { user: currentUser } = useContext(userContext);
  const { data } = useContext(chatContext);
  const handleSendImg = (file) => {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type
    });
    uploadTask.on('state_changed',            
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log('unsuccessful uploads', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('downloadURL',downloadURL);
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      }
    )
  }
  const handleSend = async () => {
    let promiseList = [
      updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      }),
      updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      }),
      updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      })
    ];
    await Promise.allSettled(promiseList)

    setText("");
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="say something..."
        onChange={(e) => { setText(e.target.value) }}
        value={text}
      />
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => handleSendImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
