import React, { useEffect, useState } from "react";
import style from "./Login.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverPath } from "../../BackendServerPath";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const login = () => {
    axios
      .post(
        `${serverPath}api/token/`,
        {
          password: password,
          username: username,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        const { access, refresh } = response?.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        if (username === "" || password === "") {
          setError("No field can be empty!");
        } else {
          setError(error?.response?.data?.detail);
        }
      });
  };

  const onLogin = () => {
    login();
    // navigate("/");
  };

  const goToHome = () => {
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    setError("");
  }, [username, password]);

  return (
    <div className={style.container}>
      <button className={style.back_button} onClick={() => navigate("/")}>
        Home Page
      </button>
      {!success ? (
        <div className={style.login_container}>
          <img
            src={process.env.PUBLIC_URL + "/login.png"}
            alt="Logo"
            className={style.image}
          />
          <input
            className={style.input}
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="new-password"
          ></input>
          <input
            className={style.input}
            autoComplete="new-password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {error && <div className={style.text_red}>{error}</div>}
          <button className={style.login_button} onClick={() => onLogin()}>
            Login
          </button>
          <a
            className={style.register_link}
            onClick={() => navigate("/register")}
          >
            Don't have an account? Register here!
          </a>
        </div>
      ) : (
        <div className={style.success_container}>
          <div className={style.text_large}>You have logged in!</div>
          <button
            className={style.login_button}
            onClick={() => {
              goToHome();
            }}
          >
            Go to home page!
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
