import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Pencil } from "lucide-react";
import DurationPicker from "react-duration-picker";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../../redux/store/chef-slice";
import { alertActions } from "../../../redux/store/alert-slice";
import AlertPopup from "../../../UI/components/AlertPopup";

const CookingTimeForm = ({ initialData, recipeId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [cookingTime, setCookingTime] = useState(initialData.cookingTime);
  const onChange = (duration) => {
    const { hours, minutes } = duration;
    setCookingTime(hours * 60 + minutes);
  };
  const convertMinutesToHoursAndMinutes = (initialCookingTime) => {
    // Calculate the number of whole hours
    const hours = Math.floor(initialCookingTime / 60);

    // Calculate the remaining minutes
    const minutes = initialCookingTime % 60;

    return {
      hours,
      minutes,
    };
  };
  const initialDuration = convertMinutesToHoursAndMinutes(
    initialData.cookingTime
  );

  const onSubmit = async (data) => {
    try {
      axios({
        method: "PUT",
        url: `http://localhost:8081/chef/recipes/update/${recipeId}`,
        data: {
          cookingTime: cookingTime,
        },
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
        <span>Edit cooking time:</span>
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
        <form onSubmit={onSubmit}>
          <DurationPicker
            onChange={onChange}
            initialDuration={initialDuration}
          />
          <Button
            type="submit"
            variant="contained"
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
            size="small"
          >
            Save
          </Button>
        </form>
      ) : (
        <p>{`${initialDuration.hours}h ${initialDuration.minutes}min`}</p>
      )}
    </div>
  );
};

export default CookingTimeForm;
