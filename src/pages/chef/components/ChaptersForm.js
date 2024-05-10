import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Pencil } from "lucide-react";

const ChaptersForm = ({ initialData, recipeId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [chapters, setChapters] = useState(initialData.chapters);
  const [newChapter, setNewChapter] = useState("");

  const handleAddChapter = () => {
    setChapters([...chapters, { title: newChapter }]);
    setNewChapter("");
  };

  const handleSave = async () => {
    try {
      await axios.patch(`/api/courses/${recipeId}`, { chapters });
      setIsEditing(false);
      // router.refresh();
    } catch (error) {
      console.error("Error updating chapters:", error);
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
        <span>Recipe steps</span>
        <Button onClick={() => setIsEditing(!isEditing)} variant="text">
          {isEditing ? "Cancel" : "Edit"}
          <Pencil
            style={{ width: "16px", height: "16px", marginLeft: "5px" }}
          />
        </Button>
      </div>
      {isEditing ? (
        <div>
          {chapters?.map((chapter, index) => (
            <TextField
              key={index}
              value={chapter.title}
              onChange={(e) => {
                const updatedChapters = [...chapters];
                updatedChapters[index].title = e.target.value;
                setChapters(updatedChapters);
              }}
              label={`Step ${index + 1}`}
              fullWidth
              variant="outlined"
              margin="normal"
            />
          ))}
          <TextField
            value={newChapter}
            onChange={(e) => setNewChapter(e.target.value)}
            label="New Step"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button onClick={handleAddChapter} variant="outlined" size="small">
            Add Step
          </Button>
          <Button onClick={handleSave} variant="contained" size="small">
            Save
          </Button>
        </div>
      ) : (
        <ol style={{ marginLeft: "10px" }}>
          {chapters?.map((chapter, index) => (
            <li key={index}>{chapter.title}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default ChaptersForm;
