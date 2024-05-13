import React, { useState } from "react";
import { TextField, Button, IconButton, ButtonBase } from "@mui/material";
import { Pencil, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { chefActions } from "../../../redux/store/chef-slice";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { alertActions } from "../../../redux/store/alert-slice";
import AlertPopup from "../../../UI/components/AlertPopup";

const TagsForm = ({ initialData, recipeId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState(
    initialData.tags
      ? initialData.tags.split(",")
      : // .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
        []
  );
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleSave = async () => {
    try {
      const formattedTags = tags.join(",");
      axios({
        method: "PUT",
        url: `http://localhost:8081/chef/recipes/update/${recipeId}`,
        data: { tags: formattedTags },
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
      console.error("Error updating steps:", error);
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
      {/* <AlertPopup /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "small",
        }}
      >
        <span>Edit tags:</span>
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
        <div>
          <Stack direction="row" spacing={1}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                variant="outlined"
                onDelete={() => handleDeleteTag(index)}
                size="6px"
                style={{
                  margin: "2px",
                  color: "var(--secondary)",
                  borderColor: "var(--secondary)",
                }}
              />
            ))}
          </Stack>

          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <TextField
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Add new tag"
            />
            <Button
              onClick={handleAddTag}
              variant="contained"
              size="small"
              style={{
                marginLeft: "10px",
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
            >
              Add Tag
            </Button>
          </div>

          <Button
            onClick={handleSave}
            variant="contained"
            size="small"
            style={{
              marginTop: "10px",
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
          >
            Save
          </Button>
        </div>
      ) : (
        <Stack direction="row" spacing={1}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={`#${tag}`}
              style={{ margin: "3px", color: "var(--secondary)" }}
            />
          ))}
        </Stack>
      )}
    </div>
  );
};

export default TagsForm;
