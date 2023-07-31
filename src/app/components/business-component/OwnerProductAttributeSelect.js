import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const SubProductAttributeSelect = (props) => {
  const {
    onChange,
    value,
    md,
    campaignStructureId,
    campaignTypeId,
    attributeType,
    error,
    setSelectedParameter,
  } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignStructureParams(
      campaignStructureId,
      campaignTypeId,
      attributeType
    )
      .then((response) => {
        response.data && setData(response.data.items);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const item = data.find((item) => item.id === value);
    const attribute = item ? item : {};
    setSelectedParameter(Object.assign({}, attribute));
  }, [data]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    const item = data.find((item) => item.id === value);
    const attribute = item ? item : {};
    setSelectedParameter(Object.assign({}, attribute));
    onChange({
      id: id,
      value: value,
      relatedProps: ["operator", "value"],
    });
  };

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
export default SubProductAttributeSelect;
