import "./index.scss";
import { logout, setAddBox } from "../reducer/action";
import { connect } from "react-redux";
import DataDaily from "./dataMap/dataDaily";
import AddEditData from "./adddata/index";
import EditdeleteData from "./editdeleteData";

const Main = ({ logout, openAddBox, setAddBox, editDeleteBox }) => {
  return (
    <div className="body">
      <div className="dataContent">
        <div className="menuContent">
          <h2>My App</h2>
          <div className="menu">
            {/* <select>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Show all</option>
            </select> */}
            {/* <input
              value="ok"
              type="date"
              onChange={(e) =>
                console.log(
                  moment(e.target.value).format("YYYY-MM"),
                  e.target.value
                )
              }
            /> */}
            {/* <select>
              <option>Select chategory...</option>
              <option>Food</option>
              <option>Sport</option>
              <option>Electronic</option>
            </select> */}
            <button onClick={() => setAddBox(true)}>Add data +</button>
            {/* <input placeholder="Search by nominal..." type="number" /> */}
            <p onClick={() => logout()}>Logout</p>
          </div>
        </div>
        <div className="mainData">
          <DataDaily />
        </div>
      </div>
      {openAddBox === true && <AddEditData />}
      {editDeleteBox === true && <EditdeleteData />}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    openAddBox: state.openAddBox,
    editDeleteBox: state.editDeleteBox,
  };
};

const dispatchReducer = (dispatch) => ({
  logout: () => dispatch(logout()),
  setAddBox: (data) => dispatch(setAddBox(data)),
});

export default connect(stateReducer, dispatchReducer)(Main);
