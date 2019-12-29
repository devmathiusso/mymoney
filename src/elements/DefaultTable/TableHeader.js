import React from "react";

const TableHeader = ({ headerColumns }) => {
  return (
    <thead>
      <tr className="text-center">
        {headerColumns &&
          headerColumns.map(column => <th key={column}>{column}</th>)}
      </tr>
    </thead>
  );
};

export default TableHeader;
