import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TimeSeriesChart from "./components/TimeSeriesChart";

const columns = [
  "HSHD_NUM",
  "L",
  "AGE_RANGE",
  "MARITAL",
  "INCOME_RANGE",
  "HOMEOWNER",
  "HSHD_COMPOSITION",
  "HH_SIZE",
  "CHILDREN",
  "BASKET_NUM",
  "PURCHASE_",
  "PRODUCT_NUM",
  "SPEND",
  "UNITS",
  "STORE_R",
  "WEEK_NUM",
  "YEAR",
  "DEPARTMENT",
  "COMMODITY",
  "BRAND_TY",
  "NATURAL_ORGANIC_FLAG",
];

function DashBoard() {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:4000/data/${id}`).then((response) => {
      setData(response.data);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Data Pull</h2>
        <label>
          Enter ID:
          <input type="text" value={id} onChange={handleIdChange} />
        </label>

        <button type="submit">Submit</button>
      </form>
      {data.length > 0 ? (
        <div class="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr>
                  {columns.map((col) => (
                    <td>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
        </div>
      ) : (
        <>
          <p>Data Not Found</p>
          <hr />
        </>
      )}
      <h2>DashBoard</h2>
      {/* <div>
        <TimeSeriesChart />
      </div> */}
      <div>
        <h3>Top7 Spending Commodities</h3>
        <BarChart />
      </div>
      <div className="pie-container">
        <PieChart />
      </div>
    </div>
  );
}

export default DashBoard;
