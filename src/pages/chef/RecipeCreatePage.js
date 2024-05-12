import React, { useEffect, useState } from "react";
import "./RecipeCreatePage.css";
import { useParams } from "react-router-dom";

import axios from "axios";
import Banner from "./components/Banner";
import Actions from "./components/Actions";
import TitleForm from "./components/TitleForm";
import CookingTimeForm from "./components/CookingTimeForm";
import ImageForm from "./components/ImageForm";
import CategoryForm from "./components/CategoryForm";
import StepsForm from "./components/StepsForm";
import NutritionalDataForm from "./components/NutritionalDataForm";
import Spinner from "../../UI/components/Spinner";
import { ListChecks } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../redux/store/chef-slice";
import IngredientsForm from "./components/IngredientsForm";
import TagsForm from "./components/TagsForm";
import { alertActions } from "../../redux/store/alert-slice";
import AlertPopup from "../../UI/components/AlertPopup";

const RecipeCreatePage = ({}) => {
  // const recipes = useSelector((state) => state.chef.recipes);
  const recipe = useSelector((state) => state.chef.currentDraft);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { id: recipeId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/chef/recipes/${recipeId}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(chefActions.initializeDraft(res.data));
          // setRecipe(currentDraft);
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!recipe) {
    return <Banner label="Recipe not found" />;
  }

  const requiredFields = [
    recipe.title,
    recipe.cookingTime,
    recipe.imageURL,
    recipe.ingredients,
    recipe.steps,
    recipe.category,
    recipe.tags,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {/* <AlertPopup /> */}
      {!recipe.isPublished && (
        <Banner label="This recipe is unpublished. It will not be visible to the public." />
      )}
      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              Recipe setup
            </h1>
            <span style={{ fontSize: "14px", color: "#4b5563" }}>
              Complete all fields ({completedFields}/{totalFields})
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            recipeId={recipeId}
            isPublished={recipe.isPublished}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Title</h2>
            </div>
            <TitleForm initialData={recipe} recipeId={recipe.id} />
          </div>
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Cooking Time
              </h2>
            </div>
            <CookingTimeForm initialData={recipe} recipeId={recipe.id} />
          </div>
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Image</h2>
            </div>
            <ImageForm initialData={recipe} recipeId={recipe.id} />
          </div>
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Ingredients
              </h2>
            </div>
            <IngredientsForm initialData={recipe} recipeId={recipe.id} />
          </div>
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Steps</h2>
            </div>
            <StepsForm initialData={recipe} recipeId={recipe.id} />
          </div>
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Nutritional facts
              </h2>
            </div>
            <NutritionalDataForm initialData={recipe} recipeId={recipe.id} />
          </div>
          <div
            style={{
              border: "1px solid #cbd5e0",
              borderRadius: "4px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ListChecks size={24} />
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Category</h2>
            </div>
            <CategoryForm initialData={recipe} recipeId={recipe.id} />
          </div>
        </div>
        <div
          style={{
            border: "1px solid #cbd5e0",
            borderRadius: "4px",
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ListChecks size={24} />
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Tags</h2>
          </div>
          <TagsForm initialData={recipe} recipeId={recipe.id} />
        </div>
      </div>
    </>
  );
};

export default RecipeCreatePage;
