import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, MenuItem, Select } from "@mui/material";
import { Pencil } from "lucide-react";

const CategoryForm = ({ initialData, recipeId }) => {
  const options = [
    {
      label: "Main Dish",
      value: "MAIN_DISH",
    },
    {
      label: "Breakfast",
      value: "BREAKFAST",
    },
    {
      label: "Dessert",
      value: "DESSERT",
    },
    {
      label: "Drinks",
      value: "DRINKS",
    },
    {
      label: "Snack",
      value: "SNACK",
    },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { category: initialData.category },
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/courses/${recipeId}`, data);
      setIsEditing(false);
      // router.refresh();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        backgroundColor: "#f3f4f6",
        borderRadius: "5px",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <span>Recipe category</span>
        <Button onClick={() => setIsEditing(!isEditing)} variant="text">
          {isEditing ? "Cancel" : "Edit"}
          <Pencil
            style={{ width: "16px", height: "16px", marginLeft: "5px" }}
          />
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            {...register("category")}
            select
            label="Category"
            fullWidth
            variant="outlined"
            margin="normal"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
        </form>
      ) : (
        <p>
          {
            options.find((option) => option.value === initialData.category)
              ?.label
          }
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
