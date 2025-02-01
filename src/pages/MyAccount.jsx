import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Loading } from "../components";
import { useNavigate } from "react-router";
import { images } from "../assets/images";

function handleLoading(state, action) {
  switch (action.type) {
    case "START":
      return { active: true, message: action.message };
      break;

    case "CONTINUE":
      return { ...state, message: action.message };

    case "END":
      return { active: false, message: "" };
      break;

    default:
      throw new Error("No loading action found");
      break;
  }
}

function MyAccount() {
  const [loading, dispatchLoading] = useReducer(handleLoading, {
    active: false,
    message: "This is a loader message",
  });

  const _user = useSelector((state) => state.AuthorsReducer.currentAuthor);
  const [user, setUser] = useState(_user);

  useEffect(() => {
    setUser(_user);
  }, [_user]);

  const navigate = useNavigate();

  if (!loading.active && user) {
    return (
      <div className="my-account">
        <div className="header">
          <img
            src={images.profile}
            alt={user?.name}
            className="profile-image"
          />
          <h2 className="name">{user?.name}</h2>
          <p className="bio">{user?.bio || "Web Developer"}</p>
          <div className="social-icons">
            {user?.facebook && (
              <img
                src={images.social.facebook}
                alt={user?.facebook}
                className="social-icon facebook"
                onClick={() => navigate(user?.facebook)}
              />
            )}

            {user?.instagram && (
              <img
                src={images.social.instagram}
                alt={user?.instagram}
                className="social-icon instagram"
                onClick={() => navigate(user?.instagram)}
              />
            )}
            {user?.linkedin && (
              <img
                src={images.social.linkedin}
                alt={user?.linkedin}
                className="social-icon linkedin"
                onClick={() => navigate(user?.linkedin)}
              />
            )}

            {user?.x && (
              <img
                src={images.social.x}
                alt={"x twitter"}
                className="social-icon x"
                onClick={() => navigate(user?.x)}
              />
            )}

            {user?.medium && (
              <img
                src={images.social.medium}
                alt={user?.medium}
                className="social-icon medium"
                onClick={() => navigate(user?.medium)}
              />
            )}
          </div>
          <Button
            text={"Edit Profile"}
            classes={"tertiary"}
            onClick={() => navigate("/edit-account")}
          />
        </div>
        <main className="container account-main">
          <aside className="left">
            <h2 className="section-title">Blogs</h2>
            {user?.blogs.length > 0 ? (
              <div className="card-container">
                {user?.blogs?.map((myBlog) => {
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
                <Button
                  text={"Create Blog"}
                  classes={"primary"}
                  onClick={() => navigate("/create-blog")}
                />
              </div>
            )}
          </aside>
          <aside className="right">
            <h2 className="section-title">Categories</h2>
            {user?.categories.length > 0 ? (
              <div className="categories-container">
                {user?.categories.map((cat) => {
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
                <Button
                  text={"Create Categories"}
                  classes={"primary"}
                  onClick={() => navigate("/create-categories")}
                />
              </div>
            )}
          </aside>
        </main>
      </div>
    );
  }

  return <Loading message="Fetching Your Account Details" />;
}

export default MyAccount;
