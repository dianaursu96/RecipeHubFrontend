import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ProfilePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";
import { alertActions } from "../../redux/store/alert-slice";

const ProfilePage = () => {
  const { firstName, lastName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const initialFormErrors = {
    firstName: false,
    lastName: false,
    email: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const token = useSelector((state) => state.auth.token);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        errors[key] = true;
        valid = false;
      }
    });

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.put("http://localhost:8081/update", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.status === 200) {
          dispatch(alertActions.setSuccessMessage("Operation successful!"));
          dispatch(
            alertActions.setSuccessMessage("Profile updated successfully!")
          );
          if (formData.email === email) {
            let userObject = JSON.parse(localStorage.getItem("userData"));
            userObject.firstName = formData.firstName;
            userObject.lastName = formData.lastName;
            userObject.email = formData.email;
            localStorage.setItem("userData", JSON.stringify(userObject));
            dispatch(
              authActions.updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
              })
            );

            navigate("/");
          } else {
            dispatch(authActions.logout());
            navigate("/login");
          }
        } else {
          dispatch(alertActions.setErrorMessage("Something went wrong."));
        }
      } catch (error) {
        if (error?.response?.data) {
          dispatch(alertActions.setErrorMessage(error?.response?.data));
        } else {
          dispatch(alertActions.setErrorMessage(error.message));
        }
      }
    }
  };

  return (
    <div className={classes.profile__container}>
      <h1>Edit your profile info</h1>
      <form
        onSubmit={handleSubmit}
        className={classes["profile__form-container"]}
      >
        {Object.keys(formData).map((key) => (
          <div
            key={key}
            className={
              formErrors[key]
                ? classes.profile__invalid
                : classes["profile__form-controls"]
            }
          >
            <label htmlFor={key}>
              {key
                .replace(/([A-Z])/g, " $1")
                .trim()
                .charAt(0)
                .toUpperCase() +
                key
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .slice(1)}
              <span>*</span>
              <input
                type={key === "email" ? key : "text"}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
              />
              {formErrors[key] && (
                <p className={classes.invalid__message}>
                  Please enter your{" "}
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .charAt(0) +
                    key
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .slice(1)
                      .toLowerCase()}
                  .
                </p>
              )}
            </label>
          </div>
        ))}
        <h4>*Updating your email will redirect you to the login page</h4>
        <div className={classes.profile__cta}>
          <button type="submit">Update Profile</button>
          <Link to="/">Back to home</Link>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
