/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:47:51
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 11:10:15
 */
import { useContext } from "react";
import { userContext } from "../context/AuthContext";
import { auth } from "../firebase";
import "../styles/navbar.scss"
import { signOut } from "firebase/auth";
const Navbar = () => {
  const clik = async () => {
    await signOut(auth);
  }
  const { user } = useContext(userContext);
  return (
    <div className='navbar'>
      <span className="logo">Sarbia chat</span>
      <div className="user">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
        <button onClick={clik}>logout</button>
      </div>
    </div>
  )
}

export default Navbar