import React, { useState, useEffect, useContext } from "react";
import CampaignDetailView from "./CampaignDetailView";
import { GlobalContext } from "../../../../context/GlobalState";
import * as CampaignDetailService from "../../../../services/campaignDetailService";
import { validate } from "./campaignDetailValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";

export default function CampaignDetailContainer() {
  const { activeSubMenu, campaign } = useContext(GlobalContext);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [campaignDetail, setCampaignDetail] = useState({
    campaignId: campaign.id,
  });
  const [showFileImport, setShowFileImport] = useState(true);

  useEffect(() => {
    CampaignDetailService.getCampaignDetailsByCampaignId(campaign.id).then(
      (response) => {
        response && response.data && setCampaignDetails(response.data.items);
      }
    );
  }, []);

  useEffect(() => {
    if (showFileImport === false) setShowFileImport(true);
  }, [showFileImport]);

  const saveOrUpdateCampaignDetail = () => {
    const error = validate(campaignDetail);
    if (ObjectUtils.isEmptyObject(error)) {
      CampaignDetailService.saveOrUpdateCampaignDetail(campaignDetail).then(
        (response) => {
          response && response.data && setCampaignDetails(response.data.items);
        }
      );
      setShowFileImport(false);
      clearCampaignDetail();
    } else {
      setErrors(error);
    }
  };

  const deleteCampaignDetail = (campaignDetail) => {
    CampaignDetailService.deleteCampaignDetail(campaignDetail).then(
      (response) => {
        response && response.data && setCampaignDetails(response.data.items);
      }
    );
    clearCampaignDetail();
  };

  const clearCampaignDetail = () => {
    setCampaignDetail({ campaignId: campaign.id });
    setErrors({});
  };

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCampaignDetail((state) => ({ ...state, [id]: value }));
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  return (
    <div>
      <PageContentArea title={activeSubMenu.title}>
        <CampaignDetailView
          activeSubMenu={activeSubMenu}
          campaignDetails={campaignDetails}
          campaignDetail={campaignDetail}
          setCampaignDetail={setCampaignDetail}
          onChange={onAreaChange}
          errors={errors}
          saveOrUpdateCampaignDetail={saveOrUpdateCampaignDetail}
          deleteCampaignDetail={deleteCampaignDetail}
          showFileImport={showFileImport}
          campaignTypeId={campaign.campaignInformation.campaignTypeId}
        />
      </PageContentArea>
    </div>
  );
}
