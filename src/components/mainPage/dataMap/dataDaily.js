import { connect } from "react-redux";
import "./index.scss";
import {
  getDataDaily,
  setEditDeleteData,
  sendData,
} from "../../reducer/action";
import { useEffect } from "react";
import moment from "moment";

const DataDaily = ({ data, getDataDaily, setEditDeleteData, sendData }) => {
  useEffect(() => {
    getDataDaily();
  }, [getDataDaily]);
  const openEditDelete = (data) => {
    sendData(data);
    setEditDeleteData(true);
  };
  const income = data.map((e) => e.total_income).reduce((a, b) => a + b, 0);
  const expense = data.map((e) => e.total_expense).reduce((a, b) => a + b, 0);
  console.log(income);
  return (
    <div className="dailyDataContainer">
      <div className="totalMoneyData">
        <h4>All Data</h4>
        <p className="income">
          Income :{" "}
          {income
            .toString()
            .split("")
            .reverse()
            .join("")
            .match(/\d{1,3}/g)
            .join(".")
            .split("")
            .reverse()
            .join("")}
        </p>
        <p className="expense">
          Expense :{" "}
          {expense
            .toString()
            .split("")
            .reverse()
            .join("")
            .match(/\d{1,3}/g)
            .join(".")
            .split("")
            .reverse()
            .join("")}
        </p>
        <p className="balance">
          Balance :{" "}
          {(income - expense)
            .toString()
            .split("")
            .reverse()
            .join("")
            .match(/\d{1,3}/g)
            .join(".")
            .split("")
            .reverse()
            .join("")}
        </p>
      </div>
      {data.length !== 0 && (
        <div className="mapData">
          {data &&
            data
              .sort(
                (a, b) =>
                  new moment(b.date).format("YYYYMMDD") -
                  new moment(a.date).format("YYYYMMDD")
              )
              .map((e) => {
                return (
                  <div className="dateParent">
                    <div className="date">
                      <h1>{moment(e.date).format("DD")}</h1>
                      <div>
                        <p>{moment(e.date).format("MM-YYYY")}</p>
                        <p>{moment(e.date).format("dddd")}</p>
                      </div>
                    </div>
                    <div className="mapContent">
                      <div className="totalDaily">
                        <p></p>
                        <p className="income">
                          IDR{" "}
                          {e.total_income
                            .toString()
                            .split("")
                            .reverse()
                            .join("")
                            .match(/\d{1,3}/g)
                            .join(".")
                            .split("")
                            .reverse()
                            .join("")}
                        </p>
                        <p className="expense">
                          IDR{" "}
                          {e.total_expense
                            .toString()
                            .split("")
                            .reverse()
                            .join("")
                            .match(/\d{1,3}/g)
                            .join(".")
                            .split("")
                            .reverse()
                            .join("")}
                        </p>
                      </div>
                      <div className="value">
                        {e.datas &&
                          e.datas.map((val) => {
                            return (
                              <div
                                onClick={() =>
                                  openEditDelete({
                                    id: val.id,
                                    type: val.type,
                                    description: val.description,
                                    price: val.price,
                                    time: val.time,
                                  })
                                }
                              >
                                <p>{val.type}</p>
                                <p className="desxText">
                                  {val.description} ojenwfoi oeiwnofi oewnfoiew
                                  oenfoiwen
                                </p>
                                <p
                                  className={
                                    val.type === "income" ? "income" : "expense"
                                  }
                                >
                                  IDR{" "}
                                  {val.price
                                    .toString()
                                    .split("")
                                    .reverse()
                                    .join("")
                                    .match(/\d{1,3}/g)
                                    .join(".")
                                    .split("")
                                    .reverse()
                                    .join("")}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      )}
      {data.length === 0 && <div className="emptyData">Data is empty</div>}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    data: state.data,
  };
};

const dispatchReducer = (dispatch) => ({
  getDataDaily: () => dispatch(getDataDaily()),
  setEditDeleteData: (data) => dispatch(setEditDeleteData(data)),
  sendData: (data) => dispatch(sendData(data)),
});

export default connect(stateReducer, dispatchReducer)(DataDaily);
