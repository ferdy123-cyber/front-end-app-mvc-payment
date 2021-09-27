const initialState = {
  isLogin: "",
  data: [],
  authLoading: false,
  alert: {
    type: "",
    text: "",
  },
  openAddBox: false,
};

const Reducer = (state = initialState, action) => {
  if (action.type === "getData") {
    return {
      ...state,
      data: action.value,
    };
  }
  if (action.type === "openAddBox") {
    return {
      ...state,
      openAddBox: action.value,
    };
  }
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
