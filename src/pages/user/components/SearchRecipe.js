import React, { useRef } from "react";
import "./SearchRecipe.css";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { recipeActions } from "../../../redux/store/recipe-slice";

const SearchRecipe = (props) => {
  const dispatch = useDispatch();
  const searchInputRef = useRef();
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(recipeActions.getSearchInput(searchInputRef.current.value));
    searchInputRef.current.value = "";
  };
  return (
    <div className={`search__form-control ${props.className}`}>
      <form onSubmit={submitSearch}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for a recipe"
        />
        <div>
          <button type="submit">
            <BiSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchRecipe;
