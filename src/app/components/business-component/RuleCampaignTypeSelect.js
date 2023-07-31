import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const RuleCampaignTypeSelect = (props) => {
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
    const { id, value, label } = event;
    onChange({ id: id, value: value, relatedProps: ["attributes"] });
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
export default RuleCampaignTypeSelect;
