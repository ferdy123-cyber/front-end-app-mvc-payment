import { useState } from "react";
import { connect } from "react-redux";
import "./index.scss";
import { register, login } from "../reducer/action";

const Auth = ({ alert, register, login, resetAlert, authLoading }) => {
  const [authActive, setAuthActive] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerHandle = (data) => {
    register(data);
  };
  const loginHandle = (data) => {
    login(data);
  };
  const changeAuthBox = (data) => {
    setAuthActive(data);
    setName("");
    setEmail("");
    setPassword("");
    resetAlert();
  };
  console.log(authLoading);
  return (
    <div className="root">
      <div className="container">
        <div className="authBox">
          <div className="loginSelector">
            <h3>Already Have an Account?</h3>
            <button onClick={() => changeAuthBox("")}>Sign In</button>
          </div>
          <div className="registerSelector" style={{ zIndex: "2" }}>
            <h3>Don't Have an Account?</h3>
            <button onClick={() => changeAuthBox("active")}>Sign Up</button>
          </div>
        </div>
        <div
          className="authForm"
          style={authActive !== "" ? { left: "50%" } : { left: "0" }}
        >
          {alert.type === "error" && (
            <div className="error alert">{alert.text}</div>
          )}
          {alert.type === "success" && (
            <div className="success alert">{alert.text}</div>
          )}
          <div
            className="loginForm"
            style={
              authActive !== ""
                ? { marginRight: "200%" }
                : { marginRight: "0px" }
            }
          >
            <h2>Sign In</h2>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <button
              onClick={() =>
                loginHandle({
                  email: email,
                  password: password,
                })
              }
            >
              {authLoading === true ? "Loading..." : "Login"}
            </button>
          </div>
          <div
            className="registerForm"
            style={
              authActive !== "" ? { marginLeft: "0px" } : { marginLeft: "200%" }
            }
          >
            <h2>Sign Up</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button
              onClick={() =>
                registerHandle({
                  email: email,
                  name: name,
                  password: password,
                })
              }
            >
              {authLoading === true ? "Loading..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const stateReducer = (state) => {
  return {
    alert: state.alert,
    authLoading: state.authLoading,
  };
};

const dispatchReducer = (dispatch) => ({
  register: (data) => dispatch(register(data)),
  login: (data) => dispatch(login(data)),
  resetAlert: () =>
    dispatch({
      type: "alert",
      value: {
        type: "",
        text: "",
      },
    }),
});

export default connect(stateReducer, dispatchReducer)(Auth);
