import { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import {
  resetAlert,
  setEditDeleteData,
  updateData,
  deleteData,
} from "../../reducer/action";

const EditDeleteData = ({
  authLoading,
  alert,
  resetAlert,
  setEditDeleteData,
  dataToUpdate,
  updateData,
  deleteData,
}) => {
  const [type, setType] = useState(dataToUpdate.type);
  const [price, setPrice] = useState(dataToUpdate.price);
  const [description, setDescription] = useState(dataToUpdate.description);
  const close = () => {
    setEditDeleteData(false);
    resetAlert();
  };
  const updateHandle = () => {
    updateData({
      id: dataToUpdate.id,
      type: type,
      description: description,
      time: dataToUpdate.time,
      price: price,
    });
  };
  const deleteHandle = () => {
    setEditDeleteData(false);
    resetAlert();
    deleteData(dataToUpdate.id);
  };
  console.log(dataToUpdate);
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
          <input value={dataToUpdate.time} type="date" />
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
          <div className="btnUpdate">
            <button onClick={() => close()} className="grey">
              Cancel
            </button>
            <button className="red" onClick={() => deleteHandle()}>
              Delete
            </button>
            {authLoading === false ? (
              <button onClick={() => updateHandle()}>Update</button>
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
    dataToUpdate: state.dataToUpdate,
  };
};

const dispatchReducer = (dispatch) => ({
  // logout: () => dispatch(logout()),
  // getDataDaily: () => dispatch(getDataDaily()),
  resetAlert: () => dispatch(resetAlert()),
  setEditDeleteData: (data) => dispatch(setEditDeleteData(data)),
  updateData: (data) => dispatch(updateData(data)),
  deleteData: (data) => dispatch(deleteData(data)),
});

export default connect(stateReducer, dispatchReducer)(EditDeleteData);
