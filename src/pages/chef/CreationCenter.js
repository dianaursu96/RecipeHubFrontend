import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa6";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { FormControl, InputLabel, Input, Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { chefActions } from "../../redux/store/chef-slice";
import { alertActions } from "../../redux/store/alert-slice";

const options = [
  {
    label: "Main Dish",
    value: "MAIN_DISH",
  },
  {
    label: "Breakfast",
    value: "BREAKFAST",
  },
  {
    label: "Dessert",
    value: "DESSERT",
  },
  {
    label: "Drinks",
    value: "DRINKS",
  },
  {
    label: "Snack",
    value: "SNACK",
  },
];

const RecipesTable = () => {
  const rows = useSelector((state) => state.chef.drafts);
  const error = useSelector((state) => state.alert.hasError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeCategory, setNewRecipeCategory] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/chef/recipes/all`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(chefActions.initializeRecipes(res.data));
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleNewRecipe = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveRecipe = () => {
    const newRecipe = {
      title: newRecipeTitle,
      category: newRecipeCategory,
    };
    axios({
      method: "POST",
      url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/chef/recipes/create`,
      data: newRecipe,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(alertActions.setSuccessMessage("Operation successful!"));
          dispatch(
            alertActions.setSuccessMessage("Recipe created successfully!")
          );
          dispatch(chefActions.addNewDraft(res.data));
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
      });
    setIsModalOpen(false);
  };

  return (
    <div>
      <Box
        style={{
          color: "var(--secondary)",
          float: "left",
          padding: "1em",
          margin: "2em",
          fontWeight: "bold",
          borderRadius: "var(--border-radius)",
          textTransform: "None",
        }}
      >
        <h1>My Recipes</h1>
      </Box>
      <Button
        variant="contained"
        startIcon={<FaPlus />}
        style={{
          background: "var(--inverse)",
          float: "right",
          padding: "1em",
          margin: "1em",
          color: "var(--primary)",
          fontFamily: "var(--font-family)",
          fontWeight: "bold",
          borderRadius: "5%",
          textTransform: "None",
          "&:hover": {
            background: "var(--primary)",
            color: "var(--inverse)",
          },
        }}
        onClick={handleNewRecipe}
      >
        Add New Recipe
      </Button>
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <TableContainer component={Paper} style={{ padding: "2em" }}>
          <Table style={{ minWidth: 650 }} aria-label="recipes table">
            <TableHead style={{ backgroundColor: "var(--inverse)" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Category
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Published
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  sx={{ textDecoration: "none" }}
                  hover
                  component={Link}
                  to={`/recipes/${row.id}`}
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    <span style={{ marginRight: "15px", fontSize: "large" }}>
                      <FaUtensils />
                    </span>
                    <b>{row.title}</b>
                  </TableCell>
                  <TableCell align="right">
                    {
                      options.find((option) => option.value === row.category)
                        .label
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Badge
                      color={row.isPublished ? "success" : "info"}
                      badgeContent={row.isPublished ? "Published" : "Draft"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/recipes/${row.id}`}
                      aria-label="edit"
                    >
                      <FaEdit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for adding new recipe */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="new-recipe-modal"
        aria-describedby="modal-to-add-new-recipe"
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              padding: "2rem",
              borderRadius: "5px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Name Your Recipe!
            </h1>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              What would you like to call your recipe?
            </p>
            <form
              onSubmit={handleSaveRecipe}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                <InputLabel>Recipe Title</InputLabel>
                <Input
                  value={newRecipeTitle}
                  onChange={(e) => setNewRecipeTitle(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={newRecipeCategory}
                  onChange={(e) => setNewRecipeCategory(e.target.value)}
                  style={{ fontFamily: "var(--font-family)" }}
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  {/* Add more categories as needed */}
                </Select>
              </FormControl>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    background: "var(--inverse)",
                    color: "var(--primary)",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "var(--inverse)",
                      color: "var(--primary)",
                    },
                  }}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "var(--primary)",
                    color: "var(--inverse)",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "var(--primary-hover)",
                      color: "var(--inverse)",
                    },
                  }}
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecipesTable;
