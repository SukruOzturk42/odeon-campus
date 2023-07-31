import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../../context/GlobalState";
import { PageContentErrorArea } from "../../../../../components/base-component/PageContentErrorArea";
import { getInitialRuleParameter } from "../../../../../common/utils/Util";
import CampaignRuleParameterView from "./CampaignRuleParameterView";
const CampaignRuleParameterContainer = (props) => {
  const {
    onChange,
    ruleKey,
    attributes,
    variant,
    type,
    title,
    error,
    structureInformation,
  } = props;
  const { activeSubMenu } = useContext(GlobalContext);
  const tempRuleParameter = getInitialRuleParameter();
  const [ruleParameters, setRuleParameters] = useState([tempRuleParameter]);
  const [campaignParameters, setCampaignParameters] = useState([]);

  useEffect(() => {
    setRuleParameters(attributes);
  }, [attributes]);

  const handleAddRuleParameter = () => {
    setRuleParameters((ruleParameters) => [
      ...ruleParameters,
      getInitialRuleParameter(),
    ]);
    onChange({
      id: "attributes",
      value: ruleParameters.concat(getInitialRuleParameter()),
      key: ruleKey,
    });
  };

  const handleDeleteRuleParameter = (id) => {
    const attributes = ruleParameters.filter((item) => item.id !== id);
    setRuleParameters(attributes);
    onChange({
      id: "attributes",
      value: attributes,
      key: ruleKey,
    });
  };

  const onAreaChange = (event) => {
    const { value, key } = event;
    let newRuleParameters = [...ruleParameters];
    newRuleParameters[key] = value;
    setRuleParameters(newRuleParameters);
    onChange({
      id: "attributes",
      value: newRuleParameters,
      key: key,
    });
  };

  return (
    <div>
      <PageContentErrorArea variant={variant}>
        {ruleParameters &&
          ruleParameters.map((item, index) => {
            return (
              <>
                <CampaignRuleParameterView
                  ruleParameters={ruleParameters}
                  error={error && error[index]}
                  index={index}
                  activeSubMenu={activeSubMenu}
                  onChange={onAreaChange}
                  parameter={item}
                  parameterId={item.id}
                  handleDeleteRuleParameter={handleDeleteRuleParameter}
                  variant={variant}
                  type={"campaign"}
                  structureInformation={structureInformation}
                  campaignParameters={campaignParameters}
                  setCampaignParameters={setCampaignParameters}
                  handleAddRuleParameter={handleAddRuleParameter}
                />
              </>
            );
          })}
      </PageContentErrorArea>
    </div>
  );
};

export default CampaignRuleParameterContainer;
