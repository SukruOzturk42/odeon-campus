import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CampaignCodeTypeSelect = (props) => {
  const { onChange, intl, error, value, md, isDisabled, setSelectedCodeType} = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignCodeTypes()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.description, value: item.id, name: item.name };
            })
          );
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setSelectedCodeType(data.filter(item => item.value == value));
  }, [value]);

  return (
    <Select
      id="codeTypeId"
      name="codeTypeId"
      label={"Kod Tipi"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={isDisabled}
    />
  );
};
export default CampaignCodeTypeSelect;
