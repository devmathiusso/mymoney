import React from "react";
import { Redirect } from "react-router-dom";
import Rest from "../../utils/rest";
import DefaultTable from "../../elements/DefaultTable";

const baseURL = "https://mymoney-mathiusso.firebaseio.com/";
const { useGet } = Rest(baseURL);

const Months = () => {
  const data = useGet("months");

  if (data.loading) {
    return <span>Loading...</span>;
  }

  if (data.error && data.error === "Permission denied") {
    return <Redirect to="/login" />;
  }

  return (
    <DefaultTable
      headerColumns={[
        "Year-Month",
        "Incoming Predict",
        "Incomings",
        "Outgoing Predict",
        "Outgoings"
      ]}
      bodyObjectToMap={data.data}
      bodyFieldsToUse={[
        "incoming_predict",
        "incomings",
        "outgoing_predict",
        "outgoings"
      ]}
    />
  );
};

export default Months;
