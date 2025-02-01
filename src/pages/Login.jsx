import React from "react";
import { PageTitle, LoginForm } from "../components";
function Login() {
  return (
    <div className="signup-page">
      <PageTitle title={"Login"} description={"Login To Your Account"} />
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
