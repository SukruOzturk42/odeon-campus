import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CampaignCodeRelatedCampaignsSelect = (props) => {
  const { onChange, intl, error, value, md, disabled } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getRelatableCampaignsForCodeCreation()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.id, value: item.id };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <Select
      id="relatedCampaignId"
      name="relatedCampaignId"
      label={"İlgili Kampanya"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={disabled}
    />
  );
};

export default CampaignCodeRelatedCampaignsSelect;
