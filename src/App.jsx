/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-30 18:01:43
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-03 23:31:27
 */
import Register  from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(userContext);
  const ProtectedRoute = ({children}) => {
    if(!user){
      return <Navigate to="/login"/>
    }
    return children;
  }
  return <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
