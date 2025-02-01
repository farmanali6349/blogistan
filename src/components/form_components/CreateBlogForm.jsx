import React, { useEffect, useState } from "react";
import { Input, Loading, Popup, CreateCategories, Categories } from "../index";
import { useForm } from "react-hook-form";
import ContentEditor from "./ContentEditor";
import { useSelector } from "react-redux";
import databaseService from "../../services/database";
import { useNavigate } from "react-router";

function CreateBlogForm({ blog }) {
  const navigate = useNavigate();
  const currentAuthor = useSelector(
    (state) => state.AuthorsReducer.currentAuthor
  );
  const [categories, setCategories] = useState(() => {
    const defaultCategories = setDefaultCategories(currentAuthor?.categories);

    if (blog?.categories?.length > 0) {
      const selectedCategories = defaultCategories.map((cat) => {
        if (blog?.categories.includes(cat?.$id)) {
          return { ...cat, isSelected: true };
        } else {
          return { ...cat, isSelected: false };
        }
      });

      return selectedCategories;
    }

    return defaultCategories;
  });
  const [filePreview, setFilePreview] = useState(
    blog?.featuredImagePreview || ""
  );

  const [popup, setPopup] = useState(false);
  const togglePopup = () => {
    setPopup((prev) => !prev);
  };

  const [loader, setLoader] = useState(false);

  // **************** CATEGORIES : Funcntions() **************

  function setDefaultCategories(categories) {
    return (
      categories?.map((category) => ({
        ...category,
        isSelected: category.$id === "uncategorized" ? true : false,
      })) || []
    );

    return [];
  }

  function handleCategorySelect(id) {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.map((category) => {
        if (id === category.$id) {
          return {
            ...category,
            isSelected: !category.isSelected,
          };
        } else {
          return { ...category };
        }
      });

      const isAnySelected = updatedCategories.some((cat) => cat.isSelected);

      if (!isAnySelected) {
        const defaultCategoryValue = updatedCategories.map((cat) => {
          if (cat.$id === "uncategorized") return { ...cat, isSelected: true };
          return cat;
        });

        return defaultCategoryValue;
      }

      return updatedCategories;
    });
  }

  useEffect(() => {
    if (currentAuthor) {
      setCategories(currentAuthor?.categories);
      setCategories(() => {
        const defaultCategories = setDefaultCategories(
          currentAuthor?.categories
        );

        if (blog?.categories.length > 0) {
          const blogCategoriesIds = blog?.categories.map((cat) => cat.$id);
          const selectedCategories = defaultCategories.map((cat) => {
            if (blogCategoriesIds.includes(cat?.$id)) {
              return { ...cat, isSelected: true };
            } else {
              return { ...cat, isSelected: false };
            }
          });

          return selectedCategories;
        }

        return defaultCategories;
      });
    }
  }, [currentAuthor]);
  // *********************************************************

  // ***********************************************

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      title: blog?.title || "",
      categories: blog?.categories || [],
      content: blog?.content || "",
    },
  });

  async function handleCreateUpdateBlog(data) {
    setLoader(true);

    const defaultFeaturedImage = "blog-featured-image";
    const defaultFeaturedImagePreview =
      "https://cloud.appwrite.io/v1/storage/buckets/6761b7bf0029abbfa233/files/blog-featured-image/view?project=67618e7e00261db18650&project=67618e7e00261db18650&mode=admin";

    if (blog) {
      // UPDATING BLOG
      // 1. Checking For New FeaturedImage
      if (data?.featuredImage[0]) {
        // New Image Is Available to Upload

        // Checking If There Is Already A Featured Image
        if (
          blog?.featuredImagePreview &&
          blog?.featuredImagePreview !== defaultFeaturedImagePreview
        ) {
          // Deleting Previous Image
          await databaseService.deleteFile(blog?.featuredImage);
          blog.featuredImagePreview = "";
        }

        // Uploading New Image
        const file = data.featuredImage?.[0]; // Ensure safe access
        const imageFile = file ? await databaseService.uploadFile(file) : null;

        if (imageFile) {
          data.featuredImage = imageFile.$id;

          // Getting image file preview
          const preview = await databaseService.getFilePreview(imageFile?.$id);
          if (preview) {
            data.featuredImagePreview = preview;
          }
        } else {
          data.featuredImage = defaultFeaturedImage;
          data.featuredImagePreview = defaultFeaturedImagePreview;
        }
      } else {
        data.featuredImage = blog?.featuredImage;
        data.featuredImagePreview = blog?.featuredImagePreview;
      }

      // 2. Adding Categories
      const blogCategories = categories
        .filter((cat) => cat.isSelected)
        .map((cat) => cat.$id);
      data.categories = blogCategories;

      // 3. Updating Blog
      const newUpdatedBlog = await updateBlog(data);

      if (newUpdatedBlog) {
        navigate("/blog/" + newUpdatedBlog.$id);
      }
    } else {
      // CREATING BLOG

      // 1. Uploading Featured Image
      if (data?.featuredImage[0]) {
        const imageFile = data.featuredImage[0]
          ? await databaseService.uploadFile(data.featuredImage[0])
          : null;
        if (imageFile) {
          data.featuredImage = imageFile.$id;

          // Getting image file preview
          const preview = await databaseService.getFilePreview(imageFile?.$id);
          if (preview) {
            data.featuredImagePreview = preview;
          }
        }
      } else {
        data.featuredImage = defaultFeaturedImage;
        data.featuredImagePreview = defaultFeaturedImagePreview;
      }

      // 2. Setting Author
      data.author = currentAuthor?.$id;

      // 3. Adding Categories
      const blogCategories = categories
        .filter((cat) => cat.isSelected)
        .map((cat) => cat.$id);
      data.categories = blogCategories;

      // 4. Uploading Data & Getting Created Blog
      const newBlog = await createBlog(data);

      if (newBlog) {
        navigate("/blog/" + newBlog?.$id);
      }
    }

    setLoader(false);
  }
  async function createBlog(data) {
    const {
      title,
      content,
      featuredImage,
      featuredImagePreview,
      author,
      categories,
    } = data;

    const newBlog = await databaseService.createPost({
      title: title.trim(),
      content: content.trim(),
      featuredImage,
      featuredImagePreview,
      author,
      categories,
    });

    if (newBlog) {
      return newBlog;
    }

    return null;
  }

  async function updateBlog(data) {
    const newBlog = {
      ...blog,
      title: data?.title,
      content: data.content,
      categories: data.categories,
      featuredImage: data.featuredImage,
      featuredImagePreview: data.featuredImagePreview,
    };

    const newUpdatedBlog = await databaseService.updatePost({ ...newBlog });

    if (newUpdatedBlog) {
      return newUpdatedBlog;
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(""); // Clear preview if no file is selected
    }
  };

  if (loader) {
    return (
      <Popup>
        <Loading
          message={`${blog ? "Updating Blog" : "Creating Blog"} ${
            getValues("title") ? ` - ${" "}[${getValues("title")}]` : ""
          } ${" "}`}
        />
      </Popup>
    );
  }

  return (
    <>
      <div className="container create-blog-container">
        <form
          onSubmit={handleSubmit(handleCreateUpdateBlog)}
          className="create-blog"
        >
          <Input
            type="text"
            label="Enter Blog Title: "
            placeholder="Genocide of the peoples of Gaza ..."
            {...register("title", {
              required: "Title is required",
            })}
            inputError={errors?.title ? errors?.title?.message : ""}
          />

          <ContentEditor
            name={"content"}
            control={control}
            label="Write Your Blog: "
            defaultValue={getValues("content")}
          />

          <input type="hidden" {...register("categories")} />

          <div className="select-categories">
            <label className="label">Select Categories: </label>
            <div className="categories-wrapper">
              {categories?.length > 0 &&
                categories?.map((category) => {
                  return (
                    <label
                      key={category.$id}
                      htmlFor={category.$id}
                      className="select-category"
                    >
                      <input
                        type="checkbox"
                        value={category.$id}
                        checked={category.isSelected}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                      />
                      <span>{category?.name}</span>
                    </label>
                  );
                })}
            </div>
            <input type="hidden" {...register("categories")} />
          </div>

          <span onClick={togglePopup}>Create Categories</span>
          <Input
            type="file"
            className="input file"
            label="Featured Image"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onChange={(e) => handleFileChange(e)}
            {...register("featuredImage", {
              required: false,
              onChange: (e) => {
                handleFileChange(e); // Call your custom function
              },
            })}
          />
          {filePreview && (
            <div className="imagePreviewContainer">
              <img src={filePreview} alt="File Preview" />
            </div>
          )}

          <Input
            type="submit"
            classes={"btn primary"}
            value={blog ? "Update Blog" : "Publish Blog"}
          />
        </form>

        {popup && (
          <Popup
            closePopup={togglePopup}
            className="popup create-blog-popup"
            style={{ height: `${root.offsetHeight}px` }}
          >
            <div className="categories-popup">
              <CreateCategories />
              <Categories />
            </div>
          </Popup>
        )}
      </div>
    </>
  );
}

export default CreateBlogForm;
