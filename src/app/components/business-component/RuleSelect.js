import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const RuleSelect = (props) => {
  const { onChange, value, md, error } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if(props.campaignTypeId){
      ReferenceDataService.getRulesByCampaignTypeId(props.campaignTypeId)
          .then((response) => {
            response.data &&
            setData(
                response.data.items.map((item) => {
                  return { label: item.name, value: item.id };
                })
            );
          })
          .catch((error) => {});
    }else{
      ReferenceDataService.getRules()
          .then((response) => {
            response.data &&
            setData(
                response.data.items.map((item) => {
                  return { label: item.name, value: item.id };
                })
            );
          })
          .catch((error) => {});
    }
  }, []);

  return (
    <Select
      id="attributeId"
      name="attributeId"
      label={"Kural"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
    />
  );
};
export default RuleSelect;
