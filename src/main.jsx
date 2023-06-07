/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-30 18:01:43
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-05 19:04:29
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>,
)
