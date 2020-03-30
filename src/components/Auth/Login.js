import React, { useState } from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateLogin from "../Auth/validateLogin";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE,
    validateLogin
  );
  const [login, setLogin] = useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            value={values.name}
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
          />
        )}
        <input
          onChange={handleChange}
          value={values.email}
          type="email"
          name="email"
          placeholder="Your email"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          value={values.password}
          type="password"
          name="password"
          placeholder="Choose a secure password"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
