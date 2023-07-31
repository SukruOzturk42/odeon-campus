import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignGoalTypeSelect = (props) => {
  const { onChange, intl, error, value, md, setSelectedGoalType, disabled } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignGoalTypes()
      .then((response) => {
        response.data && setData(response.data.items);
      })
      .catch((error) => { });
  }, []);

  const onAreaChange = (event) => {
    const {id, value} = event;
    const item = data.find((item) => item.id === value);
    const attribute = item ? item : {};
    setSelectedGoalType(Object.assign({}, attribute));
    onChange({ id:id, value: value});
  }

  return (
    <Select
      id="goalTypeId"
      name="goalTypeId"
      label={"Hedef Tipi"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value}
      error={error}
      isDisabled={disabled}
    />
  );
};
export default CampaignGoalTypeSelect;
