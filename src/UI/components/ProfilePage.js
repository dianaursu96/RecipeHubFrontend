import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ProfilePage.module.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { firstName, lastName, email } = useSelector((state) => state.auth);

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
      // then update user call to backend
      try {
        const res = await axios.put("http://localhost:8081/update", formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (res.status === 200) {
          alert("Profile updated successfully!");
          // Redirect to a success page or refresh current page
        } else {
          alert("Something went wrong.");
        }
      } catch (error) {
        if (error?.response?.data) {
          alert(error?.response?.data);
        } else {
          alert(error.message);
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
        <div className={classes.profile__cta}>
          <button type="submit">Update Profile</button>
          <Link to="/">Back to home</Link>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
