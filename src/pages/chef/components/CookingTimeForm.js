import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { Pencil } from "lucide-react";
import DurationPicker from "react-duration-picker";

const DescriptionForm = ({ initialData, recipeId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { cookingTime: initialData.cookingTime },
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/courses/${recipeId}`, data);
      setIsEditing(false);
      // router.refresh();
    } catch (error) {
      console.error("Error updating description:", error);
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
        <span>Cooking Time</span>
        <Button onClick={() => setIsEditing(!isEditing)} variant="text">
          {isEditing ? "Cancel" : "Edit cooking time"}
          <Pencil
            style={{ width: "16px", height: "16px", marginLeft: "5px" }}
          />
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DurationPicker initialDuration={{ ...register("cookingTime") }} />
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
        </form>
      ) : (
        <p>{initialData.cookingTime}</p>
      )}
    </div>
  );
};

export default DescriptionForm;
