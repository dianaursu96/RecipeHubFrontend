import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { FaCocktail } from "react-icons/fa";
import { GiButterToast } from "react-icons/gi";
import { FaBowlFood } from "react-icons/fa6";
import { LuDessert } from "react-icons/lu";
import { GiFrenchFries } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../../redux/store/reader-slice";
import "./CategoryBar.css";

const categories = [
  {
    label: "Main Dish",
    value: "MAIN_DISH",
    icon: <FaBowlFood />,
    selected: false,
  },
  {
    label: "Breakfast",
    value: "BREAKFAST",
    icon: <GiButterToast />,
    selected: false,
  },
  {
    label: "Dessert",
    value: "DESSERT",
    icon: <LuDessert />,
    selected: false,
  },
  {
    label: "Drinks",
    value: "DRINKS",
    icon: <FaCocktail />,
    selected: false,
  },
  {
    label: "Snack",
    value: "SNACK",
    icon: <GiFrenchFries />,
    selected: false,
  },
];

const CategoryBar = () => {
  const currentCategory = useSelector((state) => state.reader.currentCategory);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const dispatch = useDispatch();

  const handleClick = (category) => {
    if (selectedCategory === category.value) {
      setSelectedCategory("");
      dispatch(readerActions.setCurrentCategory(""));
    } else {
      setSelectedCategory(category.value);
      dispatch(readerActions.setCurrentCategory(category.value));
    }
  };

  return (
    <div className="categoryBar">
      <Stack direction="row" spacing={2.5} sx={{ marginLeft: 5 }}>
        {categories.map((category, index) => (
          <Chip
            key={index}
            label={category.label}
            icon={category.icon}
            onClick={() => handleClick(category)}
            style={{ margin: "5px" }}
            variant={
              selectedCategory === category.value ? "filled" : "outlined"
            }
          />
        ))}
      </Stack>
    </div>
  );
};

export default CategoryBar;
