import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignStatusTypeSelect = (props) => {
  const { onAreaChange, intl, value, md } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignStatusTypes()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.name, value: item.campaignStatus };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <Select
      id="campaignStatusId"
      name="campaignStatusId"
      label={"Kampanya Durumu"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data}
      value={value}
    />
  );
};
export default CampaignStatusTypeSelect;
