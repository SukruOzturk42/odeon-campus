import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import RuleDefinitionContainer from "./RuleDefinitionContainer";
import RuleListContainer from "./RuleListContainer";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { validate } from "./createRuleValidator";
import { getEmptyObjectHasId, getUid } from "../../../../common/utils/Util";
import ruleService from "../../../../services/ruleService";
import { SuccessModal } from "../../../../components/base-component/SuccessModal";


export default function CreateRuleContainer() {
  const { activeSubMenu } = useContext(GlobalContext);
  const tempRule = { id: getUid(), attributes: [getEmptyObjectHasId()] };
  const [ruleGroups, setRuleGroups] = useState([tempRule]);
  const [errors, setErrors] = useState([]);
  const [rules, setRules] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    ruleService.getRules().then(response => {
      response && response.data && setRules(response.data.items);
    });
  }, []);

  const saveRule = () => {
    const error = validate(ruleGroups);
    if (ObjectUtils.isEmptyObject(error)) {
      let data = { ruleGroups: ruleGroups }
      ruleService.postCreateRule(data).then(response => {
        setRuleGroups([tempRule]);
        setShowSuccessModal(true);
        ruleService.getRules().then(result => {
          result && result.data && setRules(result.data.items);
        })
      });
      setErrors([]);
    } else {
      setErrors(error);
    }
  }

  return (
    <div>
      <RuleDefinitionContainer
        activeSubMenu={activeSubMenu}
        ruleGroups={ruleGroups}
        setRuleGroups={setRuleGroups}
        errors={errors}
        setErrors={setErrors}
        saveRule={saveRule}
      />
      <RuleListContainer
        activeSubMenu={activeSubMenu}
        rules={rules}
      />
      <SuccessModal
          show={showSuccessModal}
          setShow={setShowSuccessModal}
        />
    </div>
  );
}
