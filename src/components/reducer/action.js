import axios from "axios";

export const getLoginStatus = () => (dispatch) => {
  dispatch({
    type: "isLogin",
    value: localStorage.getItem("isLogin"),
  });
};

export const register = (data) => (dispatch) => {
  dispatch({
    type: "authLoading",
    value: true,
  });
  if (data.name === "" || data.email === "" || data.password === "") {
    dispatch({
      type: "alert",
      value: {
        type: "error",
        text: "The fields cannot be null",
      },
    });
    dispatch({
      type: "authLoading",
      value: false,
    });
  } else {
    axios
      .post("http://localhost:5000/register", data)
      .then((res) => {
        dispatch({
          type: "alert",
          value: {
            type: "success",
            text: res.data.message,
          },
        });
        dispatch({
          type: "authLoading",
          value: false,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: "alert",
            value: {
              type: "error",
              text: error.response.data.error,
            },
          });
          dispatch({
            type: "authLoading",
            value: false,
          });
        } else {
          dispatch({
            type: "alert",
            value: {
              type: "error",
              text: error.message,
            },
          });
          dispatch({
            type: "authLoading",
            value: false,
          });
        }
      });
  }
};

export const login = (data) => (dispatch) => {
  dispatch({
    type: "authLoading",
    value: true,
  });
  if (data.email === "" || data.password === "") {
    dispatch({
      type: "alert",
      value: {
        type: "error",
        text: "The fields cannot be null",
      },
    });
    dispatch({
      type: "authLoading",
      value: false,
    });
  } else {
    axios
      .post("http://localhost:5000/login", data)
      .then((res) => {
        dispatch({
          type: "authLoading",
          value: false,
        });
        localStorage.setItem("isLogin", "true");
        dispatch({
          type: "isLogin",
          value: localStorage.getItem("isLogin"),
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch({
            type: "alert",
            value: {
              type: "error",
              text: error.response.data.error,
            },
          });
          dispatch({
            type: "authLoading",
            value: false,
          });
        } else {
          dispatch({
            type: "alert",
            value: {
              type: "error",
              text: error.message,
            },
          });
          dispatch({
            type: "authLoading",
            value: false,
          });
        }
      });
  }
};
