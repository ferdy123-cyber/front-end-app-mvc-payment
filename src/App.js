import { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import Auth from "./components/auth";
import { getLoginStatus } from "./components/reducer/action";
import Main from "./components/mainPage";

function App({ isLogin, getLoginStatus }) {
  console.log(isLogin);
  if (!localStorage.getItem("isLogin")) {
    localStorage.setItem("isLogin", "false");
  }
  useEffect(() => {
    getLoginStatus();
  }, [getLoginStatus]);
  return <>{isLogin === "true" ? <Main /> : <Auth />}</>;
}

const stateReducer = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const dispatchReducer = (dispatch) => ({
  getLoginStatus: () => dispatch(getLoginStatus()),
});

export default connect(stateReducer, dispatchReducer)(App);
