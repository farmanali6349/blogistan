import React from 'react'
import {Signup, PageTitle, Container} from "../../index"
import "./SignupPage.css"
function SignupPage() {
  return (
    <div className="signup-page">
      <PageTitle title={"Sign Up"} description={"Create New Account"} />
      <Container>
       <Signup /> 
      </Container>
    </div>
  )
}

export default SignupPage