import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ bodyObjectToMap, bodyFieldsToUse }) => {
  return (
    <tbody>
      {Object.keys(bodyObjectToMap).map(key => {
        return (
          <tr className="text-center" key={key}>
            <td>
              <Link to={`/cash-flow/${key}`}>{key}</Link>
            </td>
            {bodyFieldsToUse.map(field => (
              <td key={field}>{bodyObjectToMap[key][field]}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
