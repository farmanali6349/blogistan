import React, { useEffect, useState } from "react";
import { blogIcons } from "../assets/images/index";
import { Popup, Loading } from "../components/index";
import databaseService from "../services/database";
import { useNavigate } from "react-router";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  const author = useSelector((state) => state.AuthorsReducer.currentAuthor);
  const navigate = useNavigate();

  async function loadBlogs() {
    const response = await databaseService.getAllPosts();
    const blogs = [...response.documents];

    if (blogs.length > 0) {
      const sortedBlogs = [];

      for (const blog of blogs) {
        sortedBlogs.unshift(blog);
      }
      setBlogs(sortedBlogs);
    }

    setLoader(false);
  }
  useEffect(() => {
    loadBlogs();
  }, [author]);

  return (
    <main className="home">
      {loader && (
        <Popup>
          <Loading message="Loading Blogs" />
        </Popup>
      )}
      <section className="container">
        <div className="home-section-1">
          {blogs?.map((blog, index) => {
            return (
              index + 1 > 0 &&
              index + 1 < 4 && (
                <div
                  key={blog?.$id}
                  style={{
                    background: `url(${blog?.featuredImagePreview}) no-repeat center center/cover`,
                  }}
                  onClick={() => navigate(`/blog/${blog?.$id}`)}
                  className={`main-blog-${index + 1} ${
                    index === 0 ? "gradient-border" : ""
                  }`}
                >
                  <div className="overlay">
                    <h2>{blog?.title}</h2>
                    <div className="metadata">
                      <div className="categories">
                        {blog?.categories.length > 0 &&
                          blog?.categories.map((category) => {
                            return (
                              <button
                                key={category?.$id}
                                className="btn primary"
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevents the parent div click event from firing
                                  navigate("/category/" + category.$id);
                                }}
                              >
                                {category.name}
                              </button>
                            );
                          })}
                      </div>
                      <div>
                        <h4>
                          <img src={blogIcons.dateIcon} alt="date" />
                          {new Date(blog.$createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </h4>
                        <h4>
                          <img src={blogIcons.authorIcon} alt="author" />
                          {blog?.author?.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </section>

      <section className="container">
        <div className="home-section-2">
          {blogs?.length > 3 &&
            blogs?.map((myBlog, index) => {
              if (index + 1 > 3) {
                return (
                  <div className="blog-card" key={myBlog?.$id}>
                    <div className="featured-image">
                      <img
                        src={myBlog?.featuredImagePreview}
                        alt={myBlog?.title}
                      />
                    </div>
                    <div className="metadata">
                      <h2 className="blog-title">{myBlog?.title}</h2>
                      <div className="categories">
                        {myBlog?.categories.length > 0 && (
                          <>
                            {myBlog?.categories.map((category) => {
                              return (
                                <button
                                  className="btn primary"
                                  key={category?.$id}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/category/${category?.$id}`);
                                  }}
                                >
                                  {category?.name}
                                </button>
                              );
                            })}
                          </>
                        )}
                      </div>
                      <div className="date-author">
                        <h4>
                          <img src={blogIcons.dateIcon} alt="date" />
                          {new Date(myBlog?.$createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </h4>
                        <h4>
                          <img src={blogIcons.authorIcon} alt="author" />
                          {myBlog?.author?.name}
                        </h4>
                      </div>
                      <div className="description">
                        {parse(myBlog?.content.slice(0, 200) + "...")}
                      </div>
                      <button
                        className="read-more btn primary"
                        onClick={() => navigate(`/blog/${myBlog?.$id}`)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </section>
    </main>
  );
}

export default Home;
