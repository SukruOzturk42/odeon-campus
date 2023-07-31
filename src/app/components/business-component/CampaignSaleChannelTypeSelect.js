import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignSaleChannelTypeSelect = (props) => {
  const { onChange, intl, value, md, error, disabled, campaignTypeId } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getReferenceTypeByAttributeNameAndCampaignType(
      "salesChannel",
      campaignTypeId
    )
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.description, value: item.id };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <Select
      id="referenceTypeId"
      name="referenceTypeId"
      label={"Kanal Parametresi"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={disabled}
    />
  );
};
export default CampaignSaleChannelTypeSelect;
