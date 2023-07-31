import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CodesTypeSelect = (props) => {
  const { intl, error, value, setValue, md, isDisabled } = props;
  const [data, setData] = useState([
    {
      value: 1,
      label: "İndirim Kodları",
    },
    {
      value: 2,
      label: "Hediye Çekleri",
    }
  ]);

  useEffect(() => {
    /*ReferenceDataService.getCampaignCodeKinds()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.description, value: item.id };
            })
          );
      })
      .catch((error) => {});*/
  }, []);

  useEffect(() => {
    if (data) {
      setValue(data[0].value);
    }
  }, [data]);

  const onChange = (event) => {
    const { id, value } = event;
    setValue(value);
  }

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
export default CodesTypeSelect;
