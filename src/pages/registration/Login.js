import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Logo from "../../UI/components/Logo";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";

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
              uid: res.data.id,
              token: res.data.token,
              firstName: res.data.firstName,
              role: res.data.role,
              favorites: res.data.favouriteRecipeIds,
            })
          );
          dispatch(authActions.login(res.data));
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
          <Link to="/signup">No account yet? Click here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;