import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../../UI/components/Logo";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";
import { recipeActions } from "../../redux/store/recipe-slice";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLoginHandler = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8081/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              id: res.data.id,
              token: res.data.token,
              email: res.data.email,
              firstName: res.data.firstName,
              role: res.data.role,
              favourites: res.data.favourites,
            })
          );
          dispatch(authActions.login(res.data));
          dispatch(recipeActions.initializeFavourites(res.data.favourites));
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={classes.login__container}>
      <Logo />
      <form
        onSubmit={onLoginHandler}
        className={classes["login__form-container"]}
      >
        <label htmlFor="userName">
          Email:
          <input
            ref={emailRef}
            type="email"
            name="email"
            required
            placeholder="Enter your email"
          ></input>
        </label>
        <label htmlFor="userName">
          Password:
          <input
            ref={passwordRef}
            type="password"
            name="password"
            required
            placeholder="Enter your password"
          ></input>
        </label>

        <div className={classes.login__cta}>
          <button>Login</button>
          <Link to="/signup">No account yet? Click here to register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
