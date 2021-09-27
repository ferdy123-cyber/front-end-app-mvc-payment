import { useState } from "react";
import "./index.scss";
import moment from "moment";
import { connect } from "react-redux";
import { setAddBox, addData, resetAlert } from "../../reducer/action";

const AddEditData = ({
  setAddBox,
  addData,
  authLoading,
  alert,
  resetAlert,
}) => {
  const [type, setType] = useState("income");
  const [time, setTime] = useState(moment().format("YYYY-MM-DD"));
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  console.log(alert.type);
  const addDataHandle = () => {
    addData({
      type: type,
      time: time,
      price: price,
      description: description,
    });
  };
  const close = (data) => {
    setAddBox(data);
    resetAlert();
  };
  console.log(authLoading);
  return (
    <div className="addEditContainer">
      <div className="inputBox">
        <div className="typeSelect">
          <div
            className={type === "income" ? "income" : ""}
            onClick={() => setType("income")}
          >
            Income
          </div>
          <div
            className={type === "expense" ? "expense" : ""}
            onClick={() => setType("expense")}
          >
            Expense
          </div>
        </div>
        <div className="addInput">
          <input
            value={time}
            type="date"
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="value..."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
          />
          <div className="btn">
            <button onClick={() => close(false)} className="grey">
              Cancel
            </button>
            {authLoading === false ? (
              <button onClick={() => addDataHandle()}>Add</button>
            ) : (
              <button>Loading...</button>
            )}
          </div>
        </div>
        {alert.type === "error" && (
          <div className="error alert">{alert.text}</div>
        )}
      </div>
    </div>
  );
};

const stateReducer = (state) => {
  return {
    openAddBox: state.openAddBox,
    authLoading: state.authLoading,
    alert: state.alert,
  };
};

const dispatchReducer = (dispatch) => ({
  // logout: () => dispatch(logout()),
  // getDataDaily: () => dispatch(getDataDaily()),
  setAddBox: (data) => dispatch(setAddBox(data)),
  addData: (data) => dispatch(addData(data)),
  resetAlert: () => dispatch(resetAlert()),
});

export default connect(stateReducer, dispatchReducer)(AddEditData);
