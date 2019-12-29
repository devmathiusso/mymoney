import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const DefaultTable = ({ headerColumns, bodyObjectToMap, bodyFieldsToUse }) => (
  <table className="table table-hover">
    <TableHeader headerColumns={headerColumns} />
    <TableBody
      bodyObjectToMap={bodyObjectToMap}
      bodyFieldsToUse={bodyFieldsToUse}
    />
  </table>
);

export default DefaultTable;
