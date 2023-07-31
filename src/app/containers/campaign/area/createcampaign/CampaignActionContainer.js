import React, { useContext, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import CampaignActionView from "./CampaignActionView";
import { GlobalContext } from "../../../../context/GlobalState";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import ReferenceDataService from "../../../../services/ReferenceDataService";
import { getUserRole } from "../../../../services/TokenService";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";

const CampaignActionContainer = (props) => {
  const { onChange, onHandleSaveCampaign, campaign } = props;
  const {
    isCampaignPersist,
    setCampaignPersistStatus,
    setCampaignAuthorizations,
    version,
  } = useContext(GlobalContext);
  const [showVersionConfirmModal, setShowVersionConfirmModal] = useState(false);
  const [showCopyConfirmModal, setShowCopyConfirmModal] = useState(false);

  const showVersionComfirmModal = () => {
    setShowVersionConfirmModal(true);
  };

  const showCopyComfirmModal = () => {
    setShowCopyConfirmModal(true);
  };
  const onHandleNewVersion = () => {
    let campaignInformation = campaign.campaignInformation;
    campaignInformation.createMode = "NEW_VERSION";
    campaignInformation.version = campaignInformation.version + 1;
    campaignInformation.actionDescription = "";
    onChange({ id: "campaignInformation", value: campaignInformation });
    setCampaignPersistStatus(false);
    getUserAuthorization();
  };

  const getUserAuthorization = () => {
    ReferenceDataService.getRoleAuthorizations({
      userRoleId: getUserRole(),
    })
      .then((response) => {
        response.data && setCampaignAuthorizations(response.data.items);
      })
      .catch((error) => {});
  };

  const onHandleCopyCampaign = () => {
    onChange({ id: "id", value: null });
    let campaignInformation = campaign.campaignInformation;
    campaignInformation.createMode = "COPY_CAMPAIGN";
    campaignInformation.version = 0;
    campaignInformation.campaignStatusName = "";
    campaignInformation.campaignEndDate = null;
    campaignInformation.campaignStartDate = null;
    campaign.campaignApprovalStatusName = "";
    campaignInformation.actionDescription = "";
    onChange({ id: "campaignInformation", value: campaignInformation });
    setCampaignPersistStatus(false);
  };
  return (
    <div>
      <PageContentArea title={"Kampanya İşlemleri"}>
        <CampaignActionView
          onHandleSaveCampaign={onHandleSaveCampaign}
          campaign={campaign}
          onChange={onChange}
          onHandleNewVersionButton={showVersionComfirmModal}
          onHandleCopyCampaignButton={showCopyComfirmModal}
          isCampaignPersist={isCampaignPersist}
          version={version}
        />
        <ConfirmModal
          show={showVersionConfirmModal}
          title={"Yeni Versiyon"}
          bodyMessage={"Yeni versiyon oluşturmak istediginize emin misiniz?"}
          onOk={onHandleNewVersion}
          setShow={setShowVersionConfirmModal}
        />
        <ConfirmModal
          show={showCopyConfirmModal}
          title={"Yeni Kampanya"}
          bodyMessage={"Yeni kopya oluşturmak istediginize emin misiniz?"}
          onOk={onHandleCopyCampaign}
          setShow={setShowCopyConfirmModal}
        />
      </PageContentArea>
    </div>
  );
};

export default injectIntl(CampaignActionContainer);
