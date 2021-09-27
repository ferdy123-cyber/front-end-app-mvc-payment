import { connect } from "react-redux";
import "./index.scss";
import { getDataDaily } from "../../reducer/action";
import { useEffect } from "react";
import moment from "moment";

const DataDaily = ({ data, getDataDaily }) => {
  console.log(data);
  useEffect(() => {
    getDataDaily();
  }, [getDataDaily]);
  return (
    <div className="dailyDataContainer">
      <div className="totalMoneyData">
        <h4>All Data</h4>
        <p className="income">Income : 4.300.000</p>
        <p className="expense">Expense : 300.000</p>
        <p className="balance">Balance : 4.000.000</p>
      </div>
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
                            <div>
                              <p>{val.type}</p>
                              <p
                                style={{ fontSize: "13px", textAlign: "left" }}
                              >
                                {val.description}
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
    </div>
  );
};

const stateReducer = (state) => {
  return {
    data: state.data,
  };
};

const dispatchReducer = (dispatch) => ({
  // logout: () => dispatch(logout()),
  getDataDaily: () => dispatch(getDataDaily()),
});

export default connect(stateReducer, dispatchReducer)(DataDaily);
