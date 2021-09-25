const initialState = {
  isLogin: "",
  data: "hallo",
  authLoading: false,
  alert: {
    type: "",
    text: "",
  },
};

const Reducer = (state = initialState, action) => {
  if (action.type === "alert") {
    return {
      ...state,
      alert: action.value,
    };
  }
  if (action.type === "authLoading") {
    return {
      ...state,
      authLoading: action.value,
    };
  }
  if (action.type === "isLogin") {
    return {
      ...state,
      isLogin: action.value,
    };
  }
  return state;
};

export default Reducer;
