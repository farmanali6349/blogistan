import React from 'react'
import { Container, PageTitle, Categories } from "../../index"
function WriteBlog() {
  return (
    <>
      <PageTitle title={"Write Blog"} description={"Create your own blog post"} />

      <Container>
        <button className="button-primary">Write Blog</button>

        <Categories />
      </Container>
    </>
  )
}

export default WriteBlog