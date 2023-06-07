/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-30 18:22:10
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-07 18:29:40
 */
import "../styles/home.scss";
import SideBar from "../component/Sidebar";
import Chat from "../component/Chat";
import React from "react";

function Home(){
    return <div className="home">
        <div className="container">
            <SideBar/>
            <Chat/>
        </div>
    </div>
}

export default Home;