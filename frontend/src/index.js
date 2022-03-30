import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/SignUp';
import RegUserHome from './pages/RegUserHome';
import ManUserHome from './pages/ManUserHome.jsx';
import Login from './pages/Login.jsx';
import AdminHome from './pages/AdminHome.jsx';
import Home from './pages/Home.jsx';

import ReactDOM from 'react-dom';
import './index.css';


export default function App() {
  return (
    <>
      <h1> Ahoy</h1>
      {/* <nav>

      </nav> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manufacturer_home" element={<ManUserHome />} />
          <Route path="/admin_home" element={<AdminHome />} />
          <Route path="/reg_user_home" element={<RegUserHome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// ReactDOM.render(

//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
