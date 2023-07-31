import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../../components/base-component/PageContentArea";
import CampaignRewardView from "./CampaignRewardView";
import { GlobalContext } from "../../.././../../context/GlobalState";

const CampaignRewardContainer = (props) => {
  const { structureInformation, onParentAreaChange, rule, error } = props;

  const [reward, setReward] = useState({ discount: {}, gift: {} });
  const { isCampaignTypeChanged } = useContext(GlobalContext);

  useEffect(() => {
    if (isCampaignTypeChanged) {
      setReward({ discount: {}, gift: {} });
    }
  }, [isCampaignTypeChanged]);

  useEffect(() => {
    if (rule.ruleGroupReward) {
      setReward(rule.ruleGroupReward);
    }
  }, [rule.ruleGroupReward]);
  const onAreaChange = (event) => {
    const { id, value } = event;
    reward[id] = value;
    setReward(reward);
    onParentAreaChange({
      id: "ruleGroupReward",
      value: reward,
    });
  };
  return (
    <div>
      <PageContentArea title={structureInformation.title}>
        <CampaignRewardView
          reward={reward}
          onChange={onAreaChange}
          rule={rule}
          error={error && error.ruleGroupReward}
        />
      </PageContentArea>
    </div>
  );
};

export default injectIntl(CampaignRewardContainer);
