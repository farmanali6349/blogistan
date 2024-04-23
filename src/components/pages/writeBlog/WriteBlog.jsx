import React from 'react'
import { Container, PageTitle } from "../../index"
function WriteBlog() {
  return (
    <>
      <PageTitle title={"Write Blog"} description={"Create your own blog post"} />

      <Container>
        <button className="button-primary">Write Blog</button>
      </Container>
    </>
  )
}

export default WriteBlog