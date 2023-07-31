import React, { useState, useEffect, useContext } from "react";
import CampaignGoalView from "./CampaignGoalView";
import { GlobalContext } from "../../../../context/GlobalState";
import * as CampaignGoalService from "../../../../services/campaignGoalService";
import { validate } from "./campaignGoalValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";

export default function CampaignGoalContainer() {
  const { activeSubMenu, campaign } = useContext(GlobalContext);
  const [campaignGoals, setCampaignGoals] = useState([]);
  const [errors, setErrors] = useState({});
  const [campaignGoal, setCampaignGoal] = useState({ campaignId: campaign.id });
  const [goalTypeDisabled, setGoalTypeDisabled] = useState(false);
  const [saleOrPolicyDisabled, setSaleOrPolicyDisabled] = useState(false);
  const [selectedGoalType, setSelectedGoalType] = useState();

  useEffect(() => {
    CampaignGoalService.getCampaignGoalsByCampaignId(campaign.id).then(
      (response) => {
        response && response.data && setCampaignGoals(response.data.items);
      }
    );
  }, []);

  const saveOrUpdateCampaignGoal = () => {
    const error = validate(campaignGoal, selectedGoalType);
    if (ObjectUtils.isEmptyObject(error)) {
      CampaignGoalService.saveOrUpdateCampaignGoal(campaignGoal).then(
        (response) => {
          clearCampaignGoal();
          response && response.data && setCampaignGoals(response.data.items);
        }
      );
      setErrors({});
    } else {
      setErrors(error);
    }
  };

  const deleteCampaignGoal = (campaignGoal) => {
    CampaignGoalService.deleteCampaignGoal(campaignGoal).then((response) => {
      response && response.data && setCampaignGoals(response.data.items);
    });
    clearCampaignGoal();
  };

  const clearCampaignGoal = () => {
    setCampaignGoal({ campaignId: campaign.id });
    setGoalTypeDisabled(false);
    setSaleOrPolicyDisabled(false);
  };

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCampaignGoal((state) => ({ ...state, [id]: value }));
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  return (
    <div>
      <PageContentArea title={activeSubMenu.title}>
        <CampaignGoalView
          activeSubMenu={activeSubMenu}
          campaignGoals={campaignGoals}
          campaignGoal={campaignGoal}
          setCampaignGoal={setCampaignGoal}
          onChange={onAreaChange}
          errors={errors}
          saveOrUpdateCampaignGoal={saveOrUpdateCampaignGoal}
          deleteCampaignGoal={deleteCampaignGoal}
          goalTypeDisabled={goalTypeDisabled}
          setGoalTypeDisabled={setGoalTypeDisabled}
          saleOrPolicyDisabled={saleOrPolicyDisabled}
          setSaleOrPolicyDisabled={setSaleOrPolicyDisabled}
          clearCampaignGoal={clearCampaignGoal}
          selectedGoalType={selectedGoalType}
          setSelectedGoalType={setSelectedGoalType}
          campaignTypeId={campaign.campaignInformation.campaignTypeId}
        />
      </PageContentArea>
    </div>
  );
}
