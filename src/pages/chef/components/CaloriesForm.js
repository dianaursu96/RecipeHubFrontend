import React, { useState } from "react";
import axios from "axios";
import { Slider, Typography, Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

const CalorieCalculator = ({ initialData, recipeId }) => {
  const [values, setValues] = useState([33.33, 66.67]); // initial percentages for fats, carbs, and proteins
  const [calories, setCalories] = useState(initialData.calories);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: { title: initialData.title },
  });

  const onSubmit = async (data) => {
    try {
      await axios.patch(`/api/courses/${recipeId}`, data);
      setIsEditing(false);
      // router.refresh();
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValues(newValue);
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
        }}
      >
        <span>Total Calories</span>
        <Button onClick={() => setIsEditing(!isEditing)} variant="text">
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
              aria-label="percentage-slider"
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
                Proteins: {values[0].toFixed(0)}% (
                {calculateGrams(values[0], 4)}g)
              </Typography>
              <Typography>
                Carbs: {(values[1] - values[0]).toFixed(0)}% (
                {calculateGrams(values[1] - values[0], 4)}g)
              </Typography>
              <Typography>
                Fats: {(100 - values[1]).toFixed(0)}% (
                {calculateGrams(100 - values[1], 9)}g)
              </Typography>
            </Box>
          </Box>
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
        </form>
      ) : (
        <p>{initialData.calories}</p>
      )}
    </div>
  );
};

export default CalorieCalculator;
