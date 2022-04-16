import React from "react";
import { handleNavigate } from "../Auth";

const TestCookies = () => {
  return (
    <>
      <div id="pageContent">
        <button onClick={handleNavigate}>GoNav</button>
      </div>
    </>
  );
};

export default TestCookies;
