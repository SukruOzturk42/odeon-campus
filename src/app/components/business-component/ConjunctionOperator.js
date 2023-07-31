import React, { useEffect, useState } from "react";
import Select from "../base-component/Select";

const ConjunctionOperator = (props) => {
  const { onChange, value, md } = props;
  const [data, setData] = useState([
    {
      label: "AND",
      value: "AND",
    },
    {
      label: "OR",
      value: "OR",
    },
  ]);

  return (
    <>
      <Select
        id={"conjunctionOperator"}
        name={"conjunctionOperator"}
        label={"Kontrol"}
        md={md ? md : 12}
        onChange={onChange}
        options={data}
        value={value ? value : null}
        isClearable={false}
        error={props.error}
      />
    </>
  );
};
export default ConjunctionOperator;
