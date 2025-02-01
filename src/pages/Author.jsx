import React, { useEffect, useState } from "react";
import { Loading, PageTitle, Popup, Button } from "../components";
import { useNavigate, useParams } from "react-router";
import { images } from "../assets/images";
import databaseService from "../services/database";
import { useSelector } from "react-redux";

function Author() {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(false);
  const currentAuthor = useSelector(
    (state) => state.AuthorsReducer.currentAuthor
  );
  const { authorId } = useParams();

  async function loadAuthor() {
    setLoading(true);

    const author = await databaseService.getAuthor({ $id: authorId });
    setAuthor(author);
    setLoading(false);
  }

  useEffect(() => {
    loadAuthor();
  }, [authorId]);
  const navigate = useNavigate();

  if (loading) {
    <Popup>
      <Loading message="Loading Author" />
    </Popup>;
  }

  if (author === null || author === undefined) {
    return <PageTitle title={"Author Not Found"} />;
  }

  return (
    <div className="my-account">
      <div className="header">
        <img
          src={images.profile}
          alt={author?.name}
          className="profile-image"
        />
        <h2 className="name">{author?.name}</h2>
        <p className="bio">{author?.bio || ""}</p>
        <div className="social-icons">
          {author?.facebook && (
            <img
              src={images.social.facebook}
              alt={author?.facebook}
              className="social-icon facebook"
              onClick={() => navigate(author?.facebook)}
            />
          )}

          {author?.instagram && (
            <img
              src={images.social.instagram}
              alt={author?.instagram}
              className="social-icon instagram"
              onClick={() => navigate(author?.instagram)}
            />
          )}
          {author?.linkedin && (
            <img
              src={images.social.linkedin}
              alt={author?.linkedin}
              className="social-icon linkedin"
              onClick={() => navigate(author?.linkedin)}
            />
          )}

          {author?.x && (
            <img
              src={images.social.x}
              alt={"x twitter"}
              className="social-icon x"
              onClick={() => navigate(author?.x)}
            />
          )}

          {author?.medium && (
            <img
              src={images.social.medium}
              alt={author?.medium}
              className="social-icon medium"
              onClick={() => navigate(author?.medium)}
            />
          )}
        </div>

        {currentAuthor?.$id === authorId && (
          <Button
            text={"Edit Profile"}
            classes={"tertiary"}
            onClick={() => navigate("/edit-account")}
          />
        )}
      </div>
      <main className="container account-main">
        <aside className="left">
          <h2 className="section-title">Blogs</h2>
          {author?.blogs?.length > 0 ? (
            <div className="card-container">
              {author?.blogs?.map((myBlog) => {
                return (
                  <div
                    key={myBlog.$id}
                    className="card"
                    onClick={() => navigate(`/blog/${myBlog.$id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-image">
                      <img
                        src={myBlog?.featuredImagePreview}
                        alt={myBlog?.title}
                      />
                    </div>
                    <h2 className="card-title">{myBlog?.title}</h2>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-content">
              <h3>No Blog Created Yet</h3>
            </div>
          )}
        </aside>
        <aside className="right">
          <h2 className="section-title">Categories</h2>
          {author?.categories?.length > 0 ? (
            <div className="categories-container">
              {author?.categories.map((cat) => {
                return (
                  <button
                    key={cat?.$id}
                    className="btn secondary"
                    onClick={() => navigate(`/category/${cat?.$id}`)}
                  >
                    {cat?.name}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="no-content">
              <h3>No Category Created Yet</h3>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default Author;
