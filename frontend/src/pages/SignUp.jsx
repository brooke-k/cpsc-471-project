import React from "react";

const SignUp = () => {
  return (
    <div>
      <h1>This is the SignUp</h1>
      <input type="text" placeholder="Username"></input>
      <input type="text" placeholder="Email"></input>
      <input type="password" placeholder="Password"></input>
      <input type="password" placeholder="Confirm Password"></input>
      <button>Sign Up</button>
      <h2>I am a ...</h2>
      <div>
        <input type="radio" name="userType" value="admin" />
        <label for="admin">Admin</label>
      </div>
      <div>
        <input type="radio" name="userType" value="user" />
        <label for="user">User</label>
      </div>
      <div>
        <input type="radio" name="userType" value="manufacturer" />
        <label for="manufacturer">Manufacturer</label>
      </div>
    </div>
  );
};

export default SignUp;
