import React from "react";
import { PageTitle, SignupForm } from "../components";

function Signup() {
  return (
    <div className="signup-page">
      <PageTitle title={"Sign Up"} description={"Create Your Account"} />
      <div className="container">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
