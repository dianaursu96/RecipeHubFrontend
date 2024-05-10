import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { Pencil } from "lucide-react";

const ImageForm = ({ initialData, recipeId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { imageUrl: initialData.imageUrl },
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/courses/${recipeId}`, data);
      setIsEditing(false);
      // router.refresh();
    } catch (error) {
      console.error("Error updating image URL:", error);
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
        <span>Recipe image</span>
        <Button onClick={() => setIsEditing(!isEditing)} variant="text">
          {isEditing ? "Cancel" : "Edit"}
          <Pencil
            style={{ width: "16px", height: "16px", marginLeft: "5px" }}
          />
        </Button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("imageUrl")}
            label="Image URL"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
        </form>
      ) : (
        <img
          src={initialData.imageUrl}
          alt="Recipe"
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default ImageForm;
