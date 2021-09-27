import axios from "axios";

export const addData = (data) => (dispatch) => {
  dispatch({
    type: "authLoading",
    value: true,
  });
  if (data.price === null || data.description === "") {
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
      .post("http://localhost:5000/data/addData", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        axios
          .get("http://localhost:5000/data/getDataDaily", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) =>
            dispatch({
              type: "getData",
              value: response.data.data.reverse(),
            })
          )
          .catch((error) => {
            if (error.response && error.response.data) {
              console.log(error.response.data.error);
            } else {
              console.log(error.message);
            }
          });
        dispatch({
          type: "authLoading",
          value: false,
        });
        dispatch({
          type: "openAddBox",
          value: data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data.error);
        } else {
          console.log(error.message);
        }
      });
  }
};

export const setAddBox = (data) => (dispatch) => {
  dispatch({
    type: "openAddBox",
    value: data,
  });
};

export const getDataDaily = () => (dispatch) => {
  axios
    .get("http://localhost:5000/data/getDataDaily", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) =>
      dispatch({
        type: "getData",
        value: response.data.data.reverse(),
      })
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
    });
};

export const getLoginStatus = () => (dispatch) => {
  dispatch({
    type: "isLogin",
    value: localStorage.getItem("isLogin"),
  });
};

export const logout = () => (dispatch) => {
  localStorage.setItem("isLogin", "false");
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
        localStorage.setItem("token", res.data.data.token);
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
