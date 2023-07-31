import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import { getEmptyObjectHasId } from "../../../../common/utils/Util";
import RuleParameterView from "./RuleParameterView";

export default function RuleParameterContainer(props) {
  const {
    onChange,
    ruleKey,
    attributes,
    variant,
    type,
    title,
    campaignTypeId,
    setCampaignTypeError,
    errors,
  } = props;
  const { activeSubMenu } = useContext(GlobalContext);
  const tempRuleParameter = getEmptyObjectHasId();
  const [ruleParameters, setRuleParameters] = useState([tempRuleParameter]);

  useEffect(() => {
    if (attributes !== undefined)
      setRuleParameters(attributes);
    else
      setRuleParameters([{ id: getEmptyObjectHasId() }]);
  }, [attributes]);

  const handleAddRuleParameter = () => {
    if (campaignTypeId !== undefined && campaignTypeId !== null) {
      setRuleParameters((ruleParameters) => [
        ...ruleParameters,
        getEmptyObjectHasId(),
      ]);
      onChange({
        id: "attributes",
        value: ruleParameters.concat(getEmptyObjectHasId()),
        key: ruleKey,
      });
    } else {
      setCampaignTypeError("Parametre Eklemeden Önce Kampanya Tipi Seçiniz.");
    }
  };

  const handleDeleteRuleParameter = (id) => {
    const data = ruleParameters.filter((item) => item.id !== id)
    setRuleParameters(data); 
    onChange({
      id: "attributes",
      value: data,
      key: ruleKey,
    });
  };

  const onAreaChange = (event) => {
    const { value, key, error } = event;
    let newRuleParameters = [...ruleParameters];
    newRuleParameters[key] = value;
    setRuleParameters(newRuleParameters);
    let newErrors =
      errors !== undefined && errors.attributes !== undefined
        ? errors.attributes
        : [];
    newErrors[key] = error;
    onChange({
      id: "attributes",
      value: newRuleParameters,
      key: key,
      error: newErrors,
    });
  };

  return (
    <div>
      <PageContentArea
        title={title ? title : "Parametre Tanımlama"}
      >
        {campaignTypeId && ruleParameters &&
          ruleParameters.map((item, index) => {
            return (
              <RuleParameterView
                index={index}
                activeSubMenu={activeSubMenu}
                onChange={onAreaChange}
                campaignTypeId={campaignTypeId}
                parameter={item}
                parameterId={item.id}
                ruleParameters={ruleParameters}
                handleAddRuleParameter={handleAddRuleParameter}
                handleDeleteRuleParameter={handleDeleteRuleParameter}
                variant={variant}
                errors={errors && errors.attributes && errors.attributes[index]}
                type={type}
              />
            );
          })}
      </PageContentArea>
    </div>
  );
}
