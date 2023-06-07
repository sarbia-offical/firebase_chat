
/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-31 10:48:10
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 16:14:35
 */
import { useContext, useState } from "react";
import "../styles/search.scss";
import { collection, query, where, getDocs, getDoc, doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { userContext } from "../context/AuthContext";

const Search = () => {
    const [userName, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { user: currentUser } = useContext(userContext);
    const handleSelect = async () => {
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        const res = await getDoc(doc(db, 'chats', combinedId));
        try {
            if (!res.exists()) {
                let promiseList = [
                    setDoc(doc(db, 'chats', combinedId), { messages: [] }),
                    updateDoc(doc(db, "userChats", currentUser.uid), {
                        [combinedId + ".userInfo"]: {
                            uid: user.uid,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    }),
                    updateDoc(doc(db, "userChats", user.uid), {
                        [combinedId + ".userInfo"]: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        },
                        [combinedId + ".date"]: serverTimestamddp(),
                    })
                ];
                await Promise.allSettled(promiseList);
            }   
        } catch (error) {
            console.log('error', error);
        }
        setUsername("");
        setUser(null);
    }
    // 搜索事件
    const handleSearch = async () => {
        try {
            const citiesRef = collection(db, "users");
            const q = query(citiesRef, where("displayName", "==", userName));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length > 0) {
                querySnapshot.forEach(ele => {
                    setUser(ele.data());
                    setErr(false);
                })
            } else {
                setUser(null);
                setErr(true);
            }
        } catch (error) {
            setErr(true);
        }
    }
    const keydown = (e) => {
        e.code == "Enter" && handleSearch();
    }
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={keydown}
                    onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            {err && <span className="errorMessage">User not found</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
};

export default Search;

