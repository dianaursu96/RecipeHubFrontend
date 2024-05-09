import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "@mui/material";
import { Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Actions = ({ disabled, recipeId, isPublished }) => {
  const token = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${recipeId}/unpublish`);
      } else {
        await axios.patch(`/api/courses/${recipeId}/publish`);
      }

      // router.refresh();
    } catch {
      console.error("Error publishing/unpublishing recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios({
        method: "DELETE",
        url: `http://localhost:8081/chef/recipes/delete/${recipeId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate("/");
    } catch {
      console.error("Error deleting recipe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button
        onClick={handlePublish}
        disabled={disabled || isLoading}
        variant="outlined"
        size="small"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button
        onClick={() => setOpenModal(true)}
        size="small"
        disabled={isLoading}
      >
        <Trash style={{ width: "20px", height: "20px" }} />
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <h2 id="delete-modal-title">Confirm Delete</h2>
          <p id="delete-modal-description">
            Are you sure you want to delete this recipe?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleDelete} color="secondary" variant="outlined">
              Delete
            </Button>
            <Button
              onClick={() => setOpenModal(false)}
              color="primary"
              variant="outlined"
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
