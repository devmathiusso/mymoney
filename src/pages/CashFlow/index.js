import React from "react";
import { Redirect } from "react-router-dom";
import { useCashFlowApi } from "../../api";
import InfoMonth from "./InfoMonth";
import AddFlow from "./AddFlow";

const CashFlow = ({ match }) => {
  const { yearMonth } = match.params;

  // Personalized hooks
  const { cashFlow, saveNewFlow, removeFlow } = useCashFlowApi(yearMonth);

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

  const saveFlow = async data => {
    await saveNewFlow(data);
    cashFlow.refetch();
    await sleep(3000);
    //infoMonth.refetch();
  };

  const deleteFlow = async id => {
    await removeFlow(`cash-flow/${yearMonth}/${id}`);
    cashFlow.refetch();
    await sleep(3000);
    //infoMonth.refetch();
  };

  if (cashFlow.error === "Permission denied") {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <h1>Cash Flow</h1>
      <InfoMonth yearMonth={yearMonth} />

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cashFlow.data &&
            Object.keys(cashFlow.data).map(flow => (
              <tr key={flow}>
                <td>{cashFlow.data[flow].desc}</td>
                <td>{cashFlow.data[flow].value}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteFlow(flow)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          <AddFlow saveNewFlow={saveFlow} />
        </tbody>
      </table>
    </div>
  );
};

export default CashFlow;
