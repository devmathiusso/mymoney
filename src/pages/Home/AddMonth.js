import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";

const minYear = 2019;
const maxYear = 2029;

const AddMonth = () => {
  const refYear = useRef();
  const refMonth = useRef();
  const [redir, setRedir] = useState("");

  const years = [];
  const months = [];

  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }

  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }

  const zeroPad = num => {
    if (num < 10) {
      return `0${num}`;
    }

    return num;
  };

  const seeMonth = () => {
    setRedir(`${refYear.current.value}-${refMonth.current.value}`);
  };

  if (redir) {
    return <Redirect to={`/cash-flow/${redir}`} />;
  }

  return (
    <div className="mb-3 mt-2">
      <h2>Add Month</h2>

      <div className="row">
        <div className="col-md-2">
          <select ref={refYear} className="form-control">
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-1">
          <select ref={refMonth} className="form-control">
            {months.map(zeroPad).map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button onClick={seeMonth} className="btn btn-md btn-primary">
            Add Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMonth;
