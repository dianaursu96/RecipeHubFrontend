import React, { Fragment, useState } from "react";
import RecipeList from "./RecipeList";
import "./MainContent.css";
import Pagination from "../../user/components/Pagination";

const MainContent = ({ recipes }) => {
  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes =
    recipes.length > 0 && recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    if (pageNumber === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      pageNumber === "next" &&
      currentPage < Math.ceil(recipes.length / recipesPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
    }
  };

  const content =
    recipes.length > 0 ? (
      <RecipeList recipes={currentRecipes} recipeID />
    ) : (
      <h1 className="no-content-container">No results found</h1>
    );
  return (
    <Fragment>
      <main id="main-content" className="main-content-container">
        {content}
      </main>
      {recipes.length > 0 && (
        <Pagination
          currentPageNumber={currentPage}
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      )}
    </Fragment>
  );
};

export default MainContent;
