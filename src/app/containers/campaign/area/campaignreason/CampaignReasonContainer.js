import React, { useState, useEffect, useContext } from "react";
import CampaignReasonView from "./CampaignReasonView";
import { GlobalContext } from "../../../../context/GlobalState";
import { validate } from "./campaignReasonValidator";
import * as CampaignReasonService from "../../../../services/campaignReasonService";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";

export default function CampaignReasonContainer() {
  const { activeSubMenu, campaign } = useContext(GlobalContext);
  const [campaignReasons, setCampaignReasons] = useState([]);
  const [errors, setErrors] = useState({});
  const [campaignReason, setCampaignReason] = useState({
    campaignId: campaign.id,
  });
  const [isUpdatingState, setIsUpdatingState] = useState(false);

  useEffect(() => {
    CampaignReasonService.getCampaignReasonsByCampaignId(campaign.id).then(
      (response) => {
        response && response.data && setCampaignReasons(response.data.items);
      }
    );
  }, []);

  const saveOrUpdateCampaignReason = () => {
    const error = validate(campaignReason);
    if (ObjectUtils.isEmptyObject(error)) {
      CampaignReasonService.saveOrUpdateCampaignReason(campaignReason).then(
        (response) => {
          response && response.data && setCampaignReasons(response.data.items);
        }
      );
      setErrors({});
      clearCampaignReason();
    } else {
      setErrors(error);
    }
  };

  const deleteCampaignReason = (campaignReason) => {
    CampaignReasonService.deleteCampaignReason(campaignReason).then(
      (response) => {
        response && response.data && setCampaignReasons(response.data.items);
      }
    );
    clearCampaignReason();
  };

  const clearCampaignReason = () => {
    setCampaignReason({ campaignId: campaign.id });
    setIsUpdatingState(false);
  };

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCampaignReason((state) => ({ ...state, [id]: value }));
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  return (
    <div>
      <PageContentArea title={activeSubMenu.title}>
        <CampaignReasonView
          activeSubMenu={activeSubMenu}
          campaignReasons={campaignReasons}
          campaignReason={campaignReason}
          setCampaignReason={setCampaignReason}
          onChange={onAreaChange}
          errors={errors}
          saveOrUpdateCampaignReason={saveOrUpdateCampaignReason}
          deleteCampaignReason={deleteCampaignReason}
          clearCampaignReason={clearCampaignReason}
          isUpdatingState={isUpdatingState}
          setIsUpdatingState={setIsUpdatingState}
        />
      </PageContentArea>
    </div>
  );
}
