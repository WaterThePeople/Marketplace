import React, { useState } from "react";
import style from "./Register.module.sass";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => {
    navigate("/");
  };

  return (
    <div className={style.container}>
      <button className={style.back_button} onClick={() => navigate("/")}>
        Home Page
      </button>
      <div className={style.login_container}>
        <div className={style.image_container}>
          <div className={style.image_background} />
          <div className={style.image_background_2} />
          <img
            src={process.env.PUBLIC_URL + "/register.png"}
            alt="Logo"
            className={style.image}
          />
        </div>
        <input
          className={style.input}
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        ></input>
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
        <button className={style.login_button} onClick={() => onRegister()}>
          Register
        </button>
        <a className={style.register_link} onClick={() => navigate("/login")}>
          Already have an account? Login here!
        </a>
      </div>
    </div>
  );
}

export default Register;
