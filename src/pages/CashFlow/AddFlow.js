import React, { useState } from "react";

const AddFlow = ({ saveNewFlow }) => {
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");

  const onChangeDesc = evt => setDesc(evt.target.value);
  const onChangeValue = evt => setValue(evt.target.value);

  const saveFlow = async () => {
    if (!isNaN(value) && value.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await saveNewFlow({ desc, value: parseFloat(value) });
      setDesc("");
      setValue("");
    }
  };

  return (
    <tr>
      <td>
        <div className="form-group w-75">
          <input
            type="text"
            onChange={onChangeDesc}
            value={desc}
            className="form-control"
            placeholder="Description"
          />
        </div>
      </td>
      <td>
        <div className="form-group w-75">
          <input
            type="text"
            onChange={onChangeValue}
            value={value}
            className="form-control"
            placeholder="Value"
          />
        </div>
      </td>
      <td>
        <button className="btn btn-sm btn-primary" onClick={saveFlow}>
          Add
        </button>
      </td>
    </tr>
  );
};

export default AddFlow;
