import React, { useContext, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import CampaignActionDescriptionView from "./CampaignActionDescriptionView";
import { GlobalContext } from "../../../../../context/GlobalState";
import { getCampaignActionDescriptionByCampaign } from "../../../../../services/campaignService";

const CampaignActionDescriptionContainer = (props) => {
  const { onChange, campaign } = props;
  const { isCampaignPersist, setCampaignPersistStatus } = useContext(
    GlobalContext
  );
  const [description, setDescription] = useState("");
  const [actionDescriptions, setActionDescriptions] = useState([]);
  const [isEnabledAddButton, setIsEnabledAddButton] = useState(true);

  useEffect(() => {
    if (campaign.id) {
      getCampaignActionDescriptionByCampaign(campaign.id).then((response) => {
        response &&
          response.data &&
          setActionDescriptions(
            response.data.items.filter((item) => item.description !== null)
          );
        setIsEnabledAddButton(true);
      });
    } else {
      setActionDescriptions([]);
      setDescription("");
    }
  }, [campaign.id]);

  useEffect(() => {
    isCampaignPersist &&
      campaign.id &&
      getCampaignActionDescriptionByCampaign(campaign.id).then((response) => {
        response &&
          response.data &&
          setActionDescriptions(
            response.data.items.filter((item) => item.description !== null)
          );
        setIsEnabledAddButton(true);
      });
  }, [isCampaignPersist]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    setDescription(value);
  };

  const onHandleAddDescription = () => {
    let campaignInformation = campaign.campaignInformation;
    onChange({ id: "actionDescription", value: description });
    const data = {
      id: null,
      version: campaignInformation.version,
      description: description,
    };

    setActionDescriptions((prev) => [...prev, data]);
    setDescription("");
    setIsEnabledAddButton(false);
  };

  const onHandleActionsRowClick = (e, row, rowIndex) => {
    if (!row.id) {
      setIsEnabledAddButton(true);
      setDescription(row.description);
    }
  };

  const onHandleDeleteDescription = () => {
    const data = actionDescriptions.filter((item) => item.id !== null);
    setActionDescriptions(data);
  };

  return (
    <div>
      <CampaignActionDescriptionView
        campaign={campaign}
        onChange={onAreaChange}
        onHandleAddDescription={onHandleAddDescription}
        isCampaignPersist={isCampaignPersist}
        description={description}
        setDescription={setDescription}
        actionDescriptions={actionDescriptions}
        isEnabledAddButton={isEnabledAddButton}
        onHandleActionsRowClick={onHandleActionsRowClick}
        onHandleDeleteDescription={onHandleDeleteDescription}
      />
    </div>
  );
};

export default injectIntl(CampaignActionDescriptionContainer);
