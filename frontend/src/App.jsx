import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./styles/base.scss";

const App = () => {
  return (
    <Router>
      <div id="AppBase">
        <Routes>
          <Route path="/" element={<TestPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
