import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignTypeSelect = (props) => {
  const { onChange, intl, value, md, error } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignTypesByCompanyId(1)
      .then((response) => {
        response.data && setData(response.data.items);
      })
      .catch((error) => {});
  }, []);

  const onAreaChange = (event) => {
    const type = data.find((item) => item.id === event.value);
    if (type) {
      onChange({ name: type.name, id: event.id, value: event.value });
    } else {
      onChange(event);
    }
  };

  return (
    <Select
      id="campaignTypeId"
      name="campaignTypeId"
      label={"Kampanya Tipi"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value}
      error={error}
      isClearable={true}
    />
  );
};
export default CampaignTypeSelect;
