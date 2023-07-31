import React, { useState, useEffect, useContext } from "react";
import CampaignInformationView from "./CampaignInformationView";
import { GlobalContext } from "../../../../context/GlobalState";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export default function CampaignInformationContainer(props) {
  const { onChange, campaign, error } = props;
  const {
    activeSubMenu,
    setCampaignPersistStatus,
    setIsCampaignTypeChanged,
  } = useContext(GlobalContext);
  const [campaignInformation, setCampaignInformation] = useState(
    campaign.campaignInformation
  );
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaignType, setSelectedCampaignType] = useState({});

  useEffect(() => {
    setCampaignInformation(campaign.campaignInformation);
  }, [campaign.campaignInformation]);

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    campaignInformation[id] = value;
    setCampaignInformation((state) => ({ ...state, [id]: value }));
    onChange({
      id: "campaignInformation",
      value: campaignInformation,
    });
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  const onHandleCampanyTypeChange = (event) => {
    if (
      campaign.campaignInformation &&
      campaign.campaignInformation.campaignTypeId
    ) {
      setShowModal(true);
      setSelectedCampaignType(event);
      setIsCampaignTypeChanged(false);
    } else {
      const { id, name, value } = event;
      campaignInformation["campaignTypeId"] = value;
      campaignInformation["campaignTypeName"] = name;
      onChange({
        id: "campaignInformation",
        value: campaignInformation,
      });
      setErrors(ObjectUtils.removeKeyFromObject(errors, id));
    }
  };

  const onHandleModalOnOk = () => {
    const { id, name, value } = selectedCampaignType;
    setCampaignPersistStatus(false);
    campaignInformation["campaignTypeId"] = value;
    campaignInformation["campaignTypeName"] = name;
    onChange({
      id: "campaignInformation",
      value: campaignInformation,
    });
    setIsCampaignTypeChanged(true);
  };

  return (
    <div>
      <CampaignInformationView
        campaign={campaign}
        campaignInformation={campaign.campaignInformation}
        onHandleCampanyTypeChange={onHandleCampanyTypeChange}
        activeSubMenu={activeSubMenu}
        onChange={onAreaChange}
        error={errors}
      />
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title={"Kampanya Tipi Degişikligi"}
        bodyMessage={"Parametre ekranında girilen bilgiler sıfırlanacaktır"}
        onOk={onHandleModalOnOk}
      />
    </div>
  );
}
