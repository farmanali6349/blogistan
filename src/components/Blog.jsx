import React, { useState } from "react";
import { blogIcons } from "../assets/images";
import parse from "html-react-parser";
import { Button } from "./index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import databaseService from "../services/database";
function Blog({ blog }) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const author = useSelector((state) => state.AuthorsReducer.currentAuthor);
  function editBlog() {
    navigate("/edit-blog/" + blog?.$id);
  }
  async function deleteBlog() {
    await databaseService.deletePost({ $id: blog?.$id });
    navigate("/");
  }

  return (
    <div className="blog">
      <section className="title-section">
        <div className="container">
          <h1>{blog?.title}</h1>
          <div className="metadata">
            <h4>
              <img src={blogIcons.dateIcon} alt={blog?.$createdAt} />
              {new Date(blog.$createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h4>
            <h4
              onClick={() => navigate(`/author/${blog?.author?.$id}`)}
              className="author-title"
            >
              <img src={blogIcons?.authorIcon} alt={blog?.author?.name} />
              {blog?.author?.name}
            </h4>
          </div>
        </div>
      </section>

      <section className="categories">
        {blog?.categories && (
          <div className="container">
            {blog?.categories.map((category) => {
              return (
                <button
                  onClick={() => navigate(`/category/${category.$id}`)}
                  className="btn primary"
                >
                  {category?.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="featured-image container">
        <img src={blog?.featuredImagePreview} alt={blog?.title} />
      </section>

      <div className="content container">{parse(blog?.content || "")}</div>

      {author?.$id === blog?.author?.$id && (
        <div className="buttons container">
          <Button
            text={"Edit Blog"}
            classes={"primary"}
            onClick={() => editBlog()}
          />
          <Button
            text={"Delete Blog"}
            classes={"primary del"}
            onClick={() => deleteBlog()}
          />
        </div>
      )}
    </div>
  );
}

export default Blog;
