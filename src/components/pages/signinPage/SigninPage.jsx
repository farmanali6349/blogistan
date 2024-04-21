import React from 'react'
import {Signin, Container, PageTitle} from '../../index'
function SigninPage() {
  return (
    <div className="signin-page signup-page">
      <PageTitle title={"Sing In"} description={"Sing in to your account"} />
      <Container>
        <Signin />
      </Container>
    </div>
  )
}

export default SigninPage