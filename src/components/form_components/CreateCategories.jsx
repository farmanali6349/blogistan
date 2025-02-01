import React, { useEffect, useState } from "react";
import { Input, Select } from "../index";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../../services/database";
import { setCurrentAuthor } from "../../store/features/authorsSlice";
function CreateCategories() {
  const [inputValue, setInputValue] = useState("");
  const [parent, setParent] = useState("");
  const user = useSelector((state) => state.AuthReducer.userData);
  const currentAuthor = useSelector(
    (state) => state.AuthorsReducer.currentAuthor
  );
  const [author, setAuthor] = useState(currentAuthor);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.AuthReducer.status);

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
          "[ERROR] :: CreateCategories.jsx :: updateAuthorInfo() :: ",
          error
        );
      }
    }
  }

  async function createParentCategory(category) {
    try {
      const createdCategory = await databaseService.createCategory({
        ...category,
      });
      return createdCategory;
    } catch (error) {
      console.log(
        "[ERROR] :: CreateCategories.jsx :: createParentCategory() :: ",
        error
      );
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newCategory = {
      name: inputValue.trim(),
      author: currentAuthor?.$id,
      blogs: [],
    };

    setLoader(true);
    const category = await createParentCategory(newCategory);
    if (category) {
      // Updating The Author Info
      await updateAuthorInfo();
    }

    setLoader(false);
  }

  useEffect(() => {
    if (currentAuthor) {
      setAuthor(currentAuthor);
    }
  }, [currentAuthor]);

  // Create a category: Update the currentAuthor jis ne ye category banai hai.
  return (
    <div className="create-category">
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit} className="create-category-form">
        <Input
          label="Category Name"
          placehlder={"Nature, Science, Technolog etc."}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          classes="input primary"
        />

        <Input
          type="submit"
          value="Create"
          classes="btn primary"
          disabled={loader}
          loader={loader}
          parentClass="input-submit"
        />
      </form>
    </div>
  );
}

export default CreateCategories;
