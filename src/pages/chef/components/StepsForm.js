import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, IconButton } from "@mui/material";
import { Pencil, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../../redux/store/chef-slice";
import { alertActions } from "../../../redux/store/alert-slice";

const StepsForm = ({ initialData, recipeId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [steps, setSteps] = useState(
    initialData.steps ? initialData.steps?.split("|") : []
  );
  const [newStep, setNewStep] = useState("");

  const handleAddStep = () => {
    setSteps([...steps, newStep]);
    setNewStep("");
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleSave = async () => {
    try {
      const formattedSteps = steps.join("|"); // Join all steps into a single string separated by '|'
      axios({
        method: "PUT",
        url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/chef/recipes/update/${recipeId}`,
        data: { steps: formattedSteps },
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "small",
        }}
      >
        <span>Edit steps:</span> {/* Updated label */}
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
          {steps?.map((step, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <TextField
                value={step}
                onChange={(e) => {
                  const updatedSteps = [...steps];
                  updatedSteps[index] = e.target.value;
                  setSteps(updatedSteps);
                }}
                label={`Step ${index + 1}`}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <IconButton
                onClick={() => handleDeleteStep(index)}
                style={{ marginLeft: "10px" }}
              >
                <Trash size={16} />
              </IconButton>
            </div>
          ))}
          <div>
            <TextField
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              label="New Step"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button
              style={{ color: "var(--primary)", borderColor: "var(--primary)" }}
              onClick={handleAddStep}
              variant="outlined"
              size="small"
            >
              Add Step
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
        <ol style={{ marginLeft: "10px" }}>
          {steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default StepsForm;
