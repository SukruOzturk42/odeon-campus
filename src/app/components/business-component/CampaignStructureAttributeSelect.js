import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";
import _ from "lodash";

const CampaignStructureAttributeSelect = (props) => {
  const {
    onChange,
    campaignStructureId,
    campaignTypeId,
    attributeType,
    value,
    setSelectedParameter,
    error,
    md,
    ruleParameters,
    campaignParameters,
    setCampaignParameters
  } = props;
  const [data, setData] = useState([]);
  const [campaignType,setCampaignType] = useState(campaignTypeId)

  useEffect(() => {
    if(campaignParameters.length > 0){
      setData(campaignParameters);
    }else{
      ReferenceDataService.getCampaignStructureParams(
          campaignStructureId,
          campaignTypeId,
          attributeType
      )
          .then((response) => {
            response.data && setData(response.data.items);
            response.data && setCampaignParameters(response.data.items)
          })
          .catch((error) => {});
    }
  }, []);

  useEffect(() => {
    if(campaignType !== campaignTypeId){
      ReferenceDataService.getCampaignStructureParams(
          campaignStructureId,
          campaignTypeId,
          attributeType
      )
          .then((response) => {
            response.data && setData(response.data.items);
            response.data && setCampaignParameters(response.data.items)
          })
          .catch((error) => {});
    }
    if(campaignType !== campaignTypeId){
      setCampaignType(campaignTypeId)
    }
  }, [campaignTypeId]);




  useEffect(() => {
    const item = data.find((item) => item.id === value);
    const attribute = item ? item : {};
    setSelectedParameter(Object.assign({}, attribute));
  }, [data]);

  const onAreaChange = (event) => {
    const { id, value, label } = event;
    const item = data.find((item) => item.id === value);
    const attribute = item ? item : {};
    setSelectedParameter(Object.assign({}, attribute));
    onChange({ id: id, value: value, relatedProps: ["operator", "value"] });
  };

  const filterOptions = () => {
    if (ruleParameters && ruleParameters.length > 0) {
      const attributeIds = _.map(ruleParameters, "attributeId");
      const filteredAttributeIds = attributeIds.filter(
        (item) => item !== value
      );
      const filteredData = _.filter(data, function(o) {
        return !filteredAttributeIds.includes(o.id);
      });
      return filteredData;
    }
    return data;
  };

  return (
    data.length > 0 && (
      <Select
        id="attributeId"
        name="attributeId"
        label={"Parametre"}
        md={md ? md : 12}
        onChange={onAreaChange}
        options={filterOptions().map((item) => {
          return { label: item.description, value: item.id };
        })}
        value={value}
        error={error}
      />
    )
  );
};
export default CampaignStructureAttributeSelect;
