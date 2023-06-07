/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-30 18:22:38
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-06 16:54:47
 */
import "../styles/register.scss";
import Add from "../img/addAvatar.png";
import React, { useState } from "react";
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [err, setErr] = useState(false);
    const [fileName, setFileName] = useState("");
    const [filePath, setFilePath] = useState("");
    const navigate = useNavigate();
    const formSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            // 创建新用户
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const date = new Date().getTime();
            // 上传文件
            const storageRef = ref(storage, `${displayName + date}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
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
                // 修改用户信息并保存头像和昵称
                await updateProfile(res.user, {
                    displayName: displayName, 
                    photoURL: downloadURL
                });
                // 数据库写入当前用户
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL
                });
                // 数据库写入当前用户的聊天群组
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
              }
            );
        } catch (error) {
            setErr(true);
        }
    }
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fd = new FileReader();
            fd.readAsDataURL(file);
            fd.onload = (e => {
                resolve(e.target.result);
            })
        })
    }
    const changeFileInput = async (e) => {
        // console.log(URL.createObjectURL(new Blob([e.target.files[0]], {type: 'image/png'})));
        const url = await fileToBase64(e.target.files[0]);
        setFilePath(url);
        setFileName(e.target.files[0].name);
    }
    return <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">
                Sarbia Chat
            </span>
            <span className="title">
                Register
            </span>
            <form className="registerForm" onSubmit={formSubmit}>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input type="file" id="file" style={{ display: 'none' }} onChange={changeFileInput}/>
                <label htmlFor="file">
                    <img src={filePath || Add} alt="avatar" className="avatar"/>
                    <span className="tips">{ fileName || 'add an avatar' }</span>
                </label>
                <button>sign up</button>
            </form>
            <p className="tips">You do have an account? <Link to="/login">Login</Link></p>
            {err && <span className="errorMessage">Something went wrong，change email or displayname</span>}
        </div>
    </div>
}

export default Register;