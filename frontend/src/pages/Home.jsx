import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>This is the Home</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/manufacturer_home">Manufacturer Login</Link>
        <Link to="/admin_login">Administrator Login</Link>
        <Link to="/reg_user_home">User Login</Link>
      </nav>
    </div>
  );
};

export default Home;
