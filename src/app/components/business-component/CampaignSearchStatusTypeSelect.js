import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignSearchStatusTypeSelect = (props) => {
  const { onAreaChange, intl, value, md } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignSearchStatusTypes()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.name, value: item.description };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <Select
      id="campaignSearchStatusEnum"
      name="campaignSearchStatusEnum"
      label={"Kampanya Durumu"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data}
      value={value}
    />
  );
};
export default CampaignSearchStatusTypeSelect;
