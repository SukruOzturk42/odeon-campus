import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const RewardRoleType = (props) => {
  const { onChange, value, md, isMandatory } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getRewardRoleTypes()
      .then((response) => {
        response && setData(response);
        isMandatory &&
          response &&
          !value &&
          onChange({
            id: "rewardRoleId",
            value: response[0].id,
          });
      })
      .catch((error) => {});
  }, []);

  const onAreaChange = (event) => {
    onChange(event);
  };

  return (
    <Select
      id="rewardRoleId"
      name="rewardRoleId"
      label={"Kazanım Rolü"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value}
      isClearable={false}
    />
  );
};
export default RewardRoleType;
