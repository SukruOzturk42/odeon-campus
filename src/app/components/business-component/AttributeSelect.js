import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const AttributeSelect = (props) => {
  const { onChange, value, md, campaignTypeId, error, setSelectedParameter } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (campaignTypeId !== undefined) {
      ReferenceDataService.getAttributesByCampaignTypeId(campaignTypeId)
        .then((response) => {
          response.data && setData(response.data.items);
        })
        .catch((error) => { });
    }
  }, [campaignTypeId]);

  const onAreaChange = (event) => {
    const { id, value, label } = event;
    const item = data.find((item) => item.id === value);
    const attribute = item ? item : {};
    setSelectedParameter(Object.assign({}, attribute));
    onChange({ id: id, value: value });
  }

  return (
    <Select
      id="attributeId"
      name="attributeId"
      label={"Parametre"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value}
      error={error}
    />
  );
};
export default AttributeSelect;
