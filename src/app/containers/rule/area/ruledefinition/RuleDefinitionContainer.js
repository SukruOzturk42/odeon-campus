import React, { useContext, useState } from "react";
import RuleDefinitionView from "./RuleDefinitionView";
import { GlobalContext } from "../../../../context/GlobalState";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import { getEmptyObjectHasId, getUid } from "../../../../common/utils/Util";
import { Button } from "../../../../components/base-component/Button";
import ruleService from "../../../../services/ruleService";
import { validate } from "./createRuleValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";


export default function RuleDefinitionContainer(props) {
  const { activeSubMenu } = useContext(GlobalContext);
  const { ruleGroups, errors,
    setRuleGroups, setErrors, saveRule } = props;

  const handleAddRule = () => {
    setRuleGroups((ruleGroups) => [
      ...ruleGroups,
      { id: getUid(), attributes: [getEmptyObjectHasId()] },
    ]);
  };

  const handleDeleteRule = (id) => {
    const data = ruleGroups.filter((item) => item.id !== id);
    setRuleGroups(data);
  };

  const handleSaveRule = () => {
    saveRule();
  }

  const onAreaChange = (event) => {
    const { value, key, error } = event;
    let newRules = [...ruleGroups];
    newRules[key] = value;
    setRuleGroups(newRules);
    let newErrors = [...errors];
    newErrors[key] = error;
    setErrors(newErrors);
  };

  return (
    <div>
      <PageContentArea
        title={"Kural Tanımlama"}
        buttonText={"Kural Ekle"}
        buttonOnClick={handleAddRule}
      >
        {ruleGroups.map((item, index) => {
          return (
            <RuleDefinitionView
              index={index}
              activeSubMenu={activeSubMenu}
              handleDeleteRule={handleDeleteRule}
              onChange={onAreaChange}
              ruleId={item.id}
              rule={item}
              errors={errors[index]}
              setErrors={setErrors}
            />
          );
        })}
        <Button
          md={3}
          onClick={() => handleSaveRule()}
        >Kaydet</Button>
      </PageContentArea>
    </div>
  );
}
