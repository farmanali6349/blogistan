import React, { useEffect, useState } from "react";
import { PageTitle, Popup, Loading } from "../components/index";
import { useNavigate, useParams } from "react-router";
import databaseService from "../services/database";
import { blogIcons } from "../assets/images";
import parse from "html-react-parser";
function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  async function loadCategory() {
    setLoading(true);
    const cat = await databaseService.getCategory({ $id: categoryId });
    if (category) {
      setCategory(cat);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  if (loading) {
    return (
      <Popup>
        <Loading message="Loading Page" />
      </Popup>
    );
  }

  if (category === undefined || category === null) {
    return <PageTitle title={"No Such Category Found"} />;
  }

  if (category?.blogs?.length < 1) {
    return (
      <PageTitle
        title={category?.name}
        description={"There no blog linked to this category"}
      />
    );
  }
  return (
    <div className="category-page">
      <PageTitle title={category?.name} />
      <div className="category-blogs container">
        {category?.blogs?.map((myBlog) => {
          return (
            <div className="blog-card" key={myBlog?.$id}>
              <div className="featured-image">
                <img src={myBlog?.featuredImagePreview} alt={myBlog?.title} />
              </div>
              <div className="metadata">
                <h2 className="blog-title">{myBlog?.title}</h2>
                <div className="categories">
                  {myBlog?.categories?.length > 0 && (
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
                    {new Date(myBlog?.$createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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
        })}
      </div>
    </div>
  );
}

export default Category;
