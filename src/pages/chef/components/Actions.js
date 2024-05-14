import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "@mui/material";
import { Trash, BookCheck, BookX } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../../redux/store/chef-slice";
import { alertActions } from "../../../redux/store/alert-slice";

const Actions = ({ disabled, recipeId, isPublished }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      setIsLoading(true);

      axios({
        method: "PUT",
        url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/chef/recipes/publish/${recipeId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              alertActions.setSuccessMessage(
                isPublished
                  ? "Your recipe is now unpublished."
                  : "Recipe published successfully!"
              )
            );
            dispatch(chefActions.initializeDraft(res.data));
          } else {
            dispatch(alertActions.setErrorMessage(res.error.message));
          }
        })
        .catch((err) => {
          dispatch(alertActions.setErrorMessage(err.message));
        });
    } catch {
      dispatch(
        alertActions.setErrorMessage("Error publishing/unpublishing recipe")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "DELETE",
        url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/chef/recipes/delete/${recipeId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/creation");
      dispatch(alertActions.setSuccessMessage("Delete successful!"));
    } catch {
      dispatch(alertActions.setErrorMessage("Error deleting recipe"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button
        onClick={handlePublish}
        disabled={disabled || isLoading}
        variant="contained"
        startIcon={isPublished ? <BookX /> : <BookCheck />}
        style={{
          background: "var(--inverse)",
          float: "right",
          padding: "1em",
          margin: "1.3em",
          color: "var(--primary)",
          fontFamily: "var(--font-family)",
          fontWeight: "bold",
          borderRadius: "7%",
          textTransform: "None",
          "&:hover": {
            background: "var(--primary)",
            color: "var(--inverse)",
          },
        }}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button
        onClick={() => setOpenModal(true)}
        size="small"
        disabled={isLoading}
      >
        <Trash
          style={{ color: "var(--primary)", width: "20px", height: "20px" }}
        />
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div style={{ backgroundColor: "var(--inverse)", padding: "20px" }}>
          <h1 id="delete-modal-title">Confirm Delete</h1>
          <h2 id="delete-modal-description">
            Are you sure you want to delete this recipe?
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-center",
              marginTop: "20px",
            }}
          >
            <Button
              onClick={handleDelete}
              variant="outlined"
              style={{
                marginTop: "10px",
                background: "var(--primary)",
                color: "var(--inverse)",
                fontFamily: "var(--font-family)",
                fontWeight: "bold",
                borderRadius: "8%",
                borderColor: "var(--primary)",
                textTransform: "None",
                "&:hover": {
                  background: "var(--primary)",
                  color: "var(--inverse)",
                },
              }}
            >
              Delete
            </Button>

            <Button
              onClick={() => setOpenModal(false)}
              variant="outlined"
              style={{
                marginTop: "10px",
                background: "var(--inverse)",
                color: "var(--primary)",
                fontFamily: "var(--font-family)",
                fontWeight: "bold",
                borderRadius: "8%",
                borderColor: "var(--primary)",
                textTransform: "None",
                marginLeft: "20px",
                "&:hover": {
                  background: "var(--primary)",
                  color: "var(--inverse)",
                },
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Actions;
