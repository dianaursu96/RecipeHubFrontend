import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../UI/components/Logo";
import classes from "./SignUp.module.css";
import { alertActions } from "../../redux/store/alert-slice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const initialFormErrors = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

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

    if (formData.password.trim().length < 6) {
      errors.password = true;
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post(
          "https://recipe-hub-srv-9501da59a43f.herokuapp.com/register",
          formData
        );

        if (res.status === 200) {
          dispatch(
            alertActions.setSuccessMessage("Account created successfully!")
          );
          navigate("/login");
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
    <div className={classes.signup__container}>
      <Logo />
      <form
        onSubmit={handleSubmit}
        className={classes["signup__form-container"]}
      >
        {Object.keys(formData).map((key) => (
          <div
            key={key}
            className={
              formErrors[key]
                ? classes.signup__invalid
                : classes["signup__form-controls"]
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
                type={key === "password" || key === "email" ? key : "text"}
                name={key}
                value={formData[key]}
                placeholder={`Input your ${key
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .charAt(0)}${key
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .slice(1)
                  .toLowerCase()}`}
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
        <div className={classes.signup__cta}>
          <button type="submit">Sign Up</button>
          <Link to="/login">Already have an account? Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
