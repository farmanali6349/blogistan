import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import databaseService from "../services/database";
import { Loading, PageTitle, CreateBlogForm, Popup } from "../components";
function EditBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [loader, setLoader] = useState(false);

  async function loadBlogPost() {
    setLoader(true);
    const blogPost = await databaseService.getPost({ $id: blogId });

    if (blogPost) {
      setBlog(blogPost);
    }
    setLoader(false);
  }
  useEffect(() => {
    loadBlogPost();
  }, [blogId]);
  return (
    <div className="edit-blog">
      {loader ? (
        <Popup>
          <Loading message="Loading Form" />
        </Popup>
      ) : (
        <>
          <PageTitle title={"Edit Blog"} description={blog?.title} />
          <CreateBlogForm blog={blog} />
        </>
      )}
    </div>
  );
}

export default EditBlog;
