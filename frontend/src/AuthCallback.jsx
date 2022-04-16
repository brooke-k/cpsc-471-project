import React, { useEffect, useAuth } from "react";
import "./styles/pages.scss";

const AuthCallback = () => {
  const { handleAuthentication } = useAuth();
  useEffect(() => {
    handleAuthentication();
  }, []);
  return (
    <div id="pageContent">
      <h1>Authenticating, you should be redirected immediately.</h1>
    </div>
  );
};

export default AuthCallback;
