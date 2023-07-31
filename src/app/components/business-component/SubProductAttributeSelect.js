import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const SubProductAttributeSelect = (props) => {
  const { onChange, pamaterValueId, parentParameterId, value, md } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getSubProductParams(parentParameterId)
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

  const onAreaChange = (event) => {
    const { id, value } = event;
    onChange({
      id: id,
      value: value,
      relatedProps: ["operator", "value", "subProduct"],
    });
  };

  return (
    <Select
      id="attributeId"
      name="attributeId"
      label={"Parametre"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data}
      value={value}
    />
  );
};
export default SubProductAttributeSelect;
