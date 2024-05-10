import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../../redux/store/chef-slice";

const TitleForm = ({ initialData, recipeId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { title: initialData.title },
  });

  const onSubmit = async (data) => {
    try {
      axios({
        method: "PUT",
        url: `http://localhost:8081/chef/recipes/update/${recipeId}`,
        data: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(chefActions.initializeDraft(res.data));
          } else {
            alert(res.error.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating title:", error);
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
        <span>Recipe title</span>
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
            {...register("title")}
            label="Title"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
        </form>
      ) : (
        <p>{initialData.title}</p>
      )}
    </div>
  );
};

export default TitleForm;
