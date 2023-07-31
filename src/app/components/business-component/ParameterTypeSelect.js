import React, { useEffect, useState } from "react";
import Select from "../base-component/Select";

const ParamaterTypeSelect = (props) => {
  const { onChange, value, md, error, parameter } = props;
  const ruleParameterTypes = [
    {
      label: "Kural",
      value: "RULE",
    },
    {
      label: "Parametre",
      value: "PARAMETER",
    },
  ];

  const [data] = useState(ruleParameterTypes);

  return (
    <Select
      id="type"
      name="type"
      label={"Tipi"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value ? value : "PARAMETER"}
      error={error}
      isClearable={false}
    />
  );
};
export default ParamaterTypeSelect;
