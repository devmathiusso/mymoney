import React from "react";
import { useMonthApi } from "../../api";

const InfoMonth = ({ yearMonth }) => {
  const { infoMonth, changeMonth } = useMonthApi(yearMonth);

  const updatePredict = (evt, field) => {
    changeMonth({ [field]: evt.target.value });
  };

  if (infoMonth.loading) {
    return <p>Loading...</p>;
  }

  if (infoMonth.data) {
    return (
      <div>
        <div>
          Incoming Predict: {infoMonth.data.incoming_predict}{" "}
          <input
            type="text"
            onBlur={evt => updatePredict(evt, "incoming_predict")}
          />{" "}
          / Outgoing Predict: {infoMonth.data.outgoing_predict}{" "}
          <input
            type="text"
            onBlur={evt => updatePredict(evt, "outgoing_predict")}
          />
        </div>
        <div>
          Incomings: {infoMonth.data.incomings} / Outgoings:{" "}
          {infoMonth.data.outgoings}
        </div>
        <br />
      </div>
    );
  }

  return null;
};

export default InfoMonth;
