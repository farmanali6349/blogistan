import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryIcons } from "../assets/images";
import databaseService from "../services/database";
import { setCurrentAuthor } from "../store/features/authorsSlice";
function SingleCategory({ category, updateAuthorInfo }) {
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState(category?.name);
  const [isEditing, setIsEditing] = useState(false);
  async function updateCategory() {
    setIsEditing(false);
    try {
      if (category?.name !== input.trim()) {
        setLoader(true);
        const updatedCategory = await databaseService.updateCategory({
          ...category,
          name: input,
        });

        if (updatedCategory) {
          await updateAuthorInfo();
        }
      }
    } catch (error) {
      console.log("[ERROR] :: Categories.jsx :: updateCategory() :: ", error);
    }

    setLoader(false);
  }

  async function deleteCategory() {
    try {
      setLoader(true);
      await databaseService.deleteCategory({ $id: category?.$id });
    } catch (error) {
      console.log("[ERROR] :: Categories.jsx :: deleteCategory() :: ", error);
    } finally {
      await updateAuthorInfo();
      setLoader(false);
    }
  }

  return (
    <li key={category?.$id}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!isEditing}
      />
      {category?.$id !== "uncategorized" && (
        <div className="buttons">
          <button className="del" onClick={() => deleteCategory()}>
            <img
              width={"24px"}
              src={categoryIcons.deleteIcon}
              alt="delete-category"
            />
          </button>
          {!isEditing ? (
            <button className="Edit" onClick={() => setIsEditing(true)}>
              <img
                width={"24px"}
                src={categoryIcons.editIcon}
                alt="delete-category"
              />
            </button>
          ) : (
            <button className="save" onClick={() => updateCategory()}>
              <img
                width={"24px"}
                src={categoryIcons.saveIcon}
                alt="delete-category"
              />
            </button>
          )}
          {loader && <div className="btn-loader"></div>}
        </div>
      )}
    </li>
  );
}

// CATEGORIES
function Categories() {
  const dispatch = useDispatch();
  const currentAuthor = useSelector(
    (state) => state.AuthorsReducer.currentAuthor
  );

  const user = useSelector((state) => state.AuthReducer.userData);
  const [author, setAuthor] = useState(currentAuthor);

  async function updateAuthorInfo() {
    if (user) {
      try {
        const currentAuthor = await databaseService.getAuthor({
          $id: user.$id,
        });
        if (currentAuthor) {
          dispatch(setCurrentAuthor(currentAuthor));
        }
      } catch (error) {
        console.log(
          "[ERROR] :: Categories.jsx :: updateAuthorInfo() :: ",
          error
        );
      }
    }
  }

  useEffect(() => {
    if (currentAuthor) {
      setAuthor(currentAuthor);
    }
  }, [currentAuthor]);

  return (
    <div className="categories">
      <h2>Categories</h2>
      {author?.categories && author?.categories.length > 0 ? (
        <ol>
          {author?.categories.map((category) => {
            return (
              <Fragment key={category?.$id}>
                <SingleCategory
                  updateAuthorInfo={updateAuthorInfo}
                  category={category}
                />
              </Fragment>
            );
          })}
        </ol>
      ) : (
        <p>No Category Created By {author?.name || "Author"}.</p>
      )}
    </div>
  );
}

export default Categories;
