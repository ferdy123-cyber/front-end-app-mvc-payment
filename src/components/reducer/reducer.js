const initialState = {
  isLogin: "",
  data: [],
  authLoading: false,
  alert: {
    type: "",
    text: "",
  },
  openAddBox: false,
  editDeleteBox: false,
  dataToUpdate: {
    id: "",
    type: "",
    description: "",
    price: null,
    time: "",
  },
};

const Reducer = (state = initialState, action) => {
  if (action.type === "sendData") {
    return {
      ...state,
      dataToUpdate: action.value,
    };
  }
  if (action.type === "getData") {
    return {
      ...state,
      data: action.value,
    };
  }
  if (action.type === "editDeleteBox") {
    return {
      ...state,
      editDeleteBox: action.value,
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
