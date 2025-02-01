import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Blog, Loading, Popup } from "../components";
import databaseService from "../services/database";

function BlogPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [loader, setLoader] = useState(false);

  const [blog, setBlog] = useState({});

  async function loadBlog() {
    setLoader(true);
    const blog = await databaseService.getPost({ $id: blogId });
    if (blog) {
      setBlog(blog);
    }
    setLoader(false);
  }

  useEffect(() => {
    loadBlog();
  }, [blogId]);

  return (
    <div className="blog-page">
      {loader && (
        <Popup>
          <Loading message="Loading Blog Post" />
        </Popup>
      )}
      {!loader && <Blog blog={blog} />}
    </div>
  );
}

export default BlogPage;
