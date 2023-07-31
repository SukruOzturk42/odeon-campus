import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignPolicyTypeSelect = (props) => {
  const { onChange, intl, value, md, error, disabled, campaignTypeId, isMulti, setTask, isPolicyNumbers } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getReferenceTypeByAttributeNameAndCampaignType(
      "policyType",
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

  const selectAllValue = () => {
    let allValue = []
    data.forEach(item => {
      allValue.push(item.value);
    })
    if(isPolicyNumbers){
      setTask((state) => ({ ...state, policyNumbers: allValue }));
    }else{
      setTask((state) => ({ ...state, referenceTypeId: allValue }));
    }
  }

  return (
    <Select
      //id={isPolicyNumbers === true ? "policyNumbers" : "referenceTypeId"}
      //name={isPolicyNumbers ? "policyNumbers" : "referenceTypeId"}
      id={isPolicyNumbers ? isPolicyNumbers : "referenceTypeId"}
      name={isPolicyNumbers ? isPolicyNumbers : "referenceTypeId"}
      label={isMulti ? "Poliçe Tipleri" : "Poliçe Tipi"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={disabled}
      isMulti={isMulti ? isMulti : false}
      selectAllValue={selectAllValue}
    />
  );
};
export default CampaignPolicyTypeSelect;
