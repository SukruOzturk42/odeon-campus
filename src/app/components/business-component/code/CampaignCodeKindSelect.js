import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CampaignCodeKindSelect = (props) => {
  const { onChange, intl, error, value, md, isDisabled } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignCodeKinds()
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

  useEffect(() => {
    if(data && data.length === 1) {
      onChange({id:"codeKindId", value: data[0].value, label:data[0].description });
    }
  }, [data]);

  return (
    <Select
      id="codeKindId"
      name="codeKindId"
      label={"Kod Türü"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={isDisabled}
    />
  );
};
export default CampaignCodeKindSelect;
