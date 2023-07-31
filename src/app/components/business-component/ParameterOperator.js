import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";
import { Input } from "../base-component/Input";

const ParameterValue = (props) => {
  const { onChange, intl, value, md, parameterId, error } = props;
  const [data, setData] = useState([
    {
      label: "EQ",
      value: "EQ",
    },
    {
      label: "NEQ",
      value: "NEQ",
    },
    {
      label: "IN",
      value: "IN",
    },
  ]);

  useEffect(() => {
    ReferenceDataService.getOperatorsByParameterId(parameterId).then(
      (response) => {
        response.data &&
          response.data.items &&
          setData(
            response &&
              response.data &&
              response.data.items.map((item) => {
                return { label: item.name, value: item.operatorEnum };
              })
          );
      }
    );
  }, [parameterId]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    onChange({ id: id, value: value, relatedProps: ["value"] });
  };

  return (
    <>
      <Select
        id={"operator"}
        name={"operator"}
        label={"Kontrol"}
        md={md ? md : 12}
        onChange={onAreaChange}
        options={data}
        value={value}
        error={error}
      />
    </>
  );
};
export default ParameterValue;
