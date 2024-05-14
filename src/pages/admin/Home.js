import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import { FaUser } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineModeEdit as EditIcon } from "react-icons/md";
import { IoIosSave as SaveIcon } from "react-icons/io";
import { alertActions } from "../../redux/store/alert-slice";

const roles = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Reader",
    value: "READER",
  },
  {
    label: "Chef",
    value: "CHEF",
  },
];

const RecipesTable = () => {
  const error = useSelector((state) => state.alert.hasError);
  const token = useSelector((state) => state.auth.token);

  const [rows, setRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedRoles, setUpdatedRoles] = useState({});

  const dispatch = useDispatch();

  const handleRoleChange = (userId, newRole) => {
    setUpdatedRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const rolesToUpdate = Object.entries(updatedRoles).map(
      ([userId, newRole]) => ({
        userId,
        newRole,
      })
    );

    axios({
      method: "PUT",
      url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/admin/users/update/roles`,
      data: rolesToUpdate,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(alertActions.setSuccessMessage("Operation successful!"));
          setIsEditing(!isEditing);
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/admin/users/all`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRows(res.data);
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  }, [dispatch, isEditing]);

  return (
    <div>
      {isEditing ? (
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          style={{
            background: "var(--primary)",
            float: "right",
            padding: "1em",
            margin: "1.3em",
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
          onClick={handleSave}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<EditIcon />}
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
          onClick={handleEdit}
        >
          Edit mode
        </Button>
      )}
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <TableContainer component={Paper} style={{ padding: "2em" }}>
          <Table style={{ minWidth: 400 }} aria-label="recipes table">
            <TableHead style={{ backgroundColor: "var(--inverse)" }}>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>First name</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Last Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Email
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell component="th" scope="row">
                    <span style={{ marginRight: "15px" }}>
                      <FaUser />
                    </span>
                    <b>{row.firstName}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{row.lastName}</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>{row.email}</b>
                  </TableCell>
                  <TableCell align="right">
                    {!isEditing && (
                      <b>
                        {row.role.charAt(0).toUpperCase() +
                          row.role.slice(1).toLowerCase()}
                      </b>
                    )}
                    {isEditing && (
                      <>
                        <FormControl>
                          <InputLabel>Role</InputLabel>
                          <Select
                            defaultValue={row.role}
                            label="Role"
                            sx={{ width: "150px" }}
                            variant="outlined"
                            margin="normal"
                            onChange={(event) =>
                              handleRoleChange(row.id, event.target.value)
                            }
                          >
                            {roles.map((role) => (
                              <MenuItem key={role.value} value={role.value}>
                                {role.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default RecipesTable;
