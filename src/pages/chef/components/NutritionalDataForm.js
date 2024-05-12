import React, { useState } from "react";
import axios from "axios";
import { Slider, Typography, Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../../redux/store/chef-slice";
import { alertActions } from "../../../redux/store/alert-slice";

const NutritionalDataForm = ({ initialData, recipeId }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [values, setValues] = useState(
    initialData.calories !== 0
      ? [
          ((initialData.protein * 4) / initialData.calories) * 100,
          ((initialData.protein + initialData.carb * 4) /
            initialData.calories) *
            100,
        ]
      : [33.33, 66.67]
  ); // initial percentages for fats, carbs, and proteins
  const [calories, setCalories] = useState(initialData.calories ?? 0);
  const [proteins, setProteins] = useState(initialData.protein ?? 0);
  const [carbs, setCarbs] = useState(initialData.carb ?? 0);
  const [fats, setFats] = useState(initialData.fat ?? 0);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { calories: initialData.calories },
  });

  const onSubmit = async (data) => {
    data.protein = Number(proteins);
    data.carb = Number(carbs);
    data.fat = Number(fats);
    data.calories = Number(data.calories);
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

  const handleChange = (event, newValue) => {
    setValues(newValue);
    setProteins(calculateGrams(values[0], 4));
    setCarbs(calculateGrams(values[1] - values[0], 4));
    setFats(calculateGrams(100 - values[1], 9));
  };

  const calculateGrams = (percentage, caloriePerGram) => {
    return (((percentage / 100) * calories) / caloriePerGram).toFixed(1); // Convert calories to grams based on total calories
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
        <span>Edit nutritional facts:</span>
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
          <Box sx={{ width: "80%", margin: "20px auto" }}>
            <TextField
              {...register("calories")}
              label="Calories"
              width="20%"
              type="number"
              variant="outlined"
              margin="normal"
              value={calories}
              onChange={(event) => setCalories(event.target.value)}
            />
            <Slider
              value={values}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaLabel={(index) =>
                index === 0 ? "Fats" : index === 1 ? "Carbs" : "Proteins"
              }
              getAriaValueText={(value) => `${value.toFixed(0)}%`}
              sx={{
                "& .MuiSlider-track": {
                  background: `#0000FF`,
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#999",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                  width: 24,
                  height: 24,
                },
                "& .MuiSlider-rail": {
                  backgroundImage: `linear-gradient(to right, #FFA500 ${values[0]}%, #FF0000 ${values[1]}%, #FF0000 100%)`,
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography>
                Proteins: {values[0].toFixed(0)}% ({proteins}g)
              </Typography>
              <Typography>
                Carbs: {(values[1] - values[0]).toFixed(0)}% ({carbs}g)
              </Typography>
              <Typography>
                Fats: {(100 - values[1]).toFixed(0)}% ({fats}g)
              </Typography>
            </Box>
          </Box>
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
        <p>
          {initialData.calories} kcal | {initialData.protein}P |{" "}
          {initialData.carb}C | {initialData.fat}F
        </p>
      )}
    </div>
  );
};

export default NutritionalDataForm;
