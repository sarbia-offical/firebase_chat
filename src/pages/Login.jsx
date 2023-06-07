/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-30 18:22:16
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 15:12:36
 */
import "../styles/register.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function Login(){
    const navigate = useNavigate();
    const formSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
    }
    return <div className="formContainer">
    <div className="formWrapper">
            <span className="logo">
                Sarbia Chat
            </span>
            <span className="title">
                Login
            </span>
            <form className="registerForm" onSubmit={formSubmit}>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button>sign in</button>
            </form>
            <p className="tips">You dont't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
}

export default Login;