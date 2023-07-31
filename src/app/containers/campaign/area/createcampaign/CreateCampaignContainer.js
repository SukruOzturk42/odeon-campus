import React, { useState, useEffect, useContext } from "react";
import CampaignInformationContainer from "./CampaignInformationContainer";
import CampaignActionContainer from "./CampaignActionContainer";
import {
  createCampaign,
  getCampaignById,
  getCustomerCampaignById,
} from "../../../../services/campaignService";
import ReferenceDataService, {
  getRoleAuthorizations,
} from "../../../../services/ReferenceDataService";
import {
  getUserRole,
  hasUserAuthorization,
} from "../../../../services/TokenService";
import { useLocation, useHistory } from "react-router-dom";
import CampanyStructureContainer from "../../../company/CampanyStructureContainer";
import { GlobalContext } from "../../../../context/GlobalState";
import { WarningModal } from "../../../../components/base-component/WarningModal";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import { SuccessModal } from "../../../../components/base-component/SuccessModal";
import AuthorizedArea from "../../../../components/business-component/AuthorizedArea";
import { validate } from "./validator/createCampaignValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export default function CreateCampaignContainer(props) {
  const location = useLocation();
  const {
    activeSubMenu,
    setCampaignPersistStatus,
    setCampaignAuthorizations,
    setCampaign,
    campaign,
    action,
  } = useContext(GlobalContext);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showWarningModal, setWarningShowModal] = useState(false);
  const [showSaveWarningModal, setSaveWarningShowModal] = useState(false);
  const [warningModalBody, setWarningModalBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state && location.state.campaignId) {
      getCampaignById(location.state.campaignId).then((response) => {
        response && response.data && setCampaign(response.data);
        setCampaignPersistStatus(true);
        response && response.data && getUserAuthorization(response.data);
      });
    } else if (location.state && location.state.customerCampaignId) {
      getCustomerCampaignById(location.state.customerCampaignId).then(
        (response) => {
          response && response.data && setCampaign(response.data);
          setCampaignPersistStatus(true);
          response && response.data && getUserAuthorization(response.data);
        }
      );
    }
  }, []);

  const getUserAuthorization = (cm) => {
    hasUserAuthorization() &&
      ReferenceDataService.getRoleAuthorizations({
        userRoleId: getUserRole(),
        campaignStatusId: cm.campaignInformation.campaignStatusId,
        campaignApprovalStatusId:
          cm.campaignInformation.campaignApprovalStatusId,
      })
        .then((response) => {
          response.data && setCampaignAuthorizations(response.data.items);
        })
        .catch((error) => {});
  };

  const onAreaChange = (event) => {
    const { id, value } = event;
    campaign[id] = value;
    setCampaign(campaign);
  };

  const onHandleSaveCampaign = () => {
    saveCampaign();
  };

  const saveCampaign = () => {
    const validationResult = validate(campaign);
    if (
      ObjectUtils.isEmptyObject(
        ObjectUtils.removeEmptyObjects(validationResult)
      )
    ) {
      setSaveWarningShowModal(true);
      setErrors({});
    } else {
      setErrors(validationResult);
      setWarningShowModal(true);
      setWarningModalBody("Zorunlu alanları giriniz.");
    }
  };

  const persistCampaign = () => {
    createCampaign(campaign).then((response) => {
      if (response && response.data && response.data != null) {
        setCampaign(response.data);
        setCampaignPersistStatus(true);
        setShowModal(true);
        getUserAuthorization(response.data);
        history.push({
          pathname: "/cm-campaign",
          state: { campaignId: campaign.id },
        });
        getUserAuthorization(response.data);
      }
    });
  };

  return (
    <>
      {hasUserAuthorization() && (
        <CampaignActionContainer
          onHandleSaveCampaign={onHandleSaveCampaign}
          campaign={campaign}
          onChange={onAreaChange}
        />
      )}

      <AuthorizedArea authKey={"PAGE_EDIT"}>
        <CampaignInformationContainer
          error={errors.campaignInformation}
          campaign={campaign}
          activeSubMenu={activeSubMenu}
          onChange={onAreaChange}
        />
      </AuthorizedArea>
      {campaign.campaignInformation &&
        campaign.campaignInformation.campaignTypeId && (
          <AuthorizedArea authKey={"PAGE_EDIT"}>
            <CampanyStructureContainer
              error={errors}
              campaign={campaign}
              onChange={onAreaChange}
            />
          </AuthorizedArea>
        )}
      <SuccessModal
        show={showModal}
        setShow={setShowModal}
        onOk={() => {
          setShowModal(false);
        }}
      ></SuccessModal>
      <WarningModal
        show={showWarningModal}
        setShow={setWarningShowModal}
        title={"Uyarı"}
        body={warningModalBody}
        onOk={() => {
          setWarningShowModal(false);
          setWarningModalBody("");
        }}
      />
      <ConfirmModal
        show={showSaveWarningModal}
        setShow={setSaveWarningShowModal}
        title={"Onay"}
        bodyMessage={
          "İşleminiz kayıt edilecektir. Devam etmek istediğinize emin misiniz?"
        }
        onOk={() => {
          persistCampaign();
        }}
      />
    </>
  );
}
