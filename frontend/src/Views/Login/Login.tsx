import React, { useState } from "react";
import style from "./Login.module.sass";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    navigate("/");
  };

  return (
    <div className={style.container}>
      <button className={style.back_button} onClick={() => navigate("/")}>
        Home Page
      </button>
      <div className={style.login_container}>
        <img
          src={process.env.PUBLIC_URL + "/login.png"}
          alt="Logo"
          className={style.image}
        />
        <input
          className={style.input}
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
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
    </div>
  );
}

export default Login;
