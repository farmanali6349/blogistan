import React from "react";
import { PageTitle } from "../components";
import { CreateBlogForm } from "../components/index";
function CreateBlog() {
  return (
    <>
      <PageTitle
        title={"Create Blog"}
        description={"Create Your Own Blog With Your Own Preferences"}
      />

      <CreateBlogForm />
    </>
  );
}
export default CreateBlog;
