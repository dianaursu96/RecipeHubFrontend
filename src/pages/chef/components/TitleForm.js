import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../../redux/store/chef-slice";
import { alertActions } from "../../../redux/store/alert-slice";

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
        url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/chef/recipes/update/${recipeId}`,
        data: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(alertActions.setSuccessMessage("Operation successful!"));
            dispatch(chefActions.initializeDraft(res.data));
          } else {
            dispatch(alertActions.setErrorMessage(res.error.message));
          }
        })
        .catch((err) => {
          dispatch(alertActions.setErrorMessage(err.message));
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
          fontSize: "small",
        }}
      >
        <span>Edit title:</span>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          style={{ color: "var(--primary)", borderColor: "var(--primary)" }}
          variant="text"
        >
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
          <Button
            type="submit"
            variant="contained"
            style={{
              background: "var(--primary)",
              color: "var(--inverse)",
              fontFamily: "var(--font-family)",
              fontWeight: "bold",
              borderRadius: "8%",
              textTransform: "None",
              "&:hover": {
                background: "var(--primary)",
                color: "var(--inverse)",
              },
            }}
            size="small"
          >
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
