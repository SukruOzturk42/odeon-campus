import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import CampaignProductRuleContainer from "./rule/CampaignProductRuleContainer";
import {
  getInitialRule,
  getUid,
  getInitialRuleParameter,
} from "../../../../common/utils/Util";
import { GlobalContext } from "../../.././../context/GlobalState";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

const CampaignProductContainer = (props) => {
  const {
    intl,
    activeSubMenu,
    structureInformation,
    onChange,
    campaign,
    error,
  } = props;
  const { setCampaignPersistStatus, isCampaignTypeChanged } = useContext(
    GlobalContext
  );
  const [rules, setRules] = useState(campaign.campaignRuleGroups);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(error);
  }, [error]);

  useEffect(() => {
    if (isCampaignTypeChanged) {
      setRules([getInitialRule()]);
    }
  }, [isCampaignTypeChanged]);

  useEffect(() => {
    setRules(campaign.campaignRuleGroups);
  }, [campaign]);

  const handleAddRule = () => {
    var data = rules.concat(getInitialRule());
    setRules(data);
    onChange({ id: "campaignRuleGroups", value: data });
    setErrors(ObjectUtils.removeKeyFromObject(errors, "ruleGroups"));
  };

  const handleDeleteRule = (id) => {
    const data = rules.filter((item) => item.id !== id);
    setRules(data);
    onChange({ id: "campaignRuleGroups", value: data });
    setCampaignPersistStatus(false);
  };

  const onAreaChange = (event) => {
    const { value, key } = event;
    let newRules = [...rules];
    newRules[key] = value;
    setRules(newRules);
    onChange({ id: "campaignRuleGroups", value: newRules });
  };

  const styles = {
    border: "3px solid #1BC5BD",
    marginTop: "10px",
    paddingTop: "10px",
    boxShadow: "1px 3px 1px #1BC5BD",
  };

  return (
    <div>
      <PageContentArea
        title={structureInformation.title}
        buttonText={"Koşul Ekle"}
        variant={"success"}
        buttonOnClick={handleAddRule}
        error={errors ? errors.ruleGroups : ""}
      >
        {rules.map((item, index) => {
          return (
            <div style={styles}>
              <div>
                <CampaignProductRuleContainer
                  error={error && error.length > 0 ? error[index] : {}}
                  campaign={campaign}
                  key={index}
                  index={index}
                  activeSubMenu={activeSubMenu}
                  handleDeleteRule={handleDeleteRule}
                  onChange={onAreaChange}
                  ruleId={item.id}
                  rule={item}
                  structureInformation={structureInformation}
                />
              </div>
            </div>
          );
        })}
      </PageContentArea>
    </div>
  );
};

export default injectIntl(CampaignProductContainer);
