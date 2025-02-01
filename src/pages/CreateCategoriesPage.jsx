import React from "react";
import { Categories, PageTitle } from "../components";
import { CreateCategories } from "../components";
function CreateCategoriesPage() {
  return (
    <main className="create-categories">
      <PageTitle
        title={"Create Categories"}
        description={
          "Create Parent And Sub Categories According To Your Preferences"
        }
      />
      <div className="container">
        <CreateCategories />
        <Categories />
      </div>
    </main>
  );
}

export default CreateCategoriesPage;
