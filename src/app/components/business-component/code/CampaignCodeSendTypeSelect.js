import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CampaignCodeSendTypeSelect = (props) => {
  const { onChange, intl, error, value, md, isDisabled } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignCodeSendTypes()
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
      id="codeSendTypeId"
      name="codeSendTypeId"
      label={"Gönderim Şekli"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={isDisabled}
    />
  );
};
export default CampaignCodeSendTypeSelect;
