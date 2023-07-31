import React, { useEffect, useState, useContext } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import campaignService from "../../services/campaignService";
import { GlobalContext } from "../../context/GlobalState";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignVersionsSelect = (props) => {
  const { intl, value, md, error, campaignId } = props;
  const [data, setData] = useState([]);
  const {
    setCampaign,
    isCampaignPersist,
    setVersion,
    setCampaignPersistStatus,
  } = useContext(GlobalContext);
  const [selectedVersion, setSelectedVersion] = useState();

  useEffect(() => {
    ReferenceDataService.getCampaignVersions(campaignId)
      .then((response) => {
        if (response.data) {
          const data = response.data.items;
          const activeVersion = data.find(
            (item) => item.isActiveVersion == true
          );
          setVersion(activeVersion);
          setSelectedVersion(activeVersion.id);
          setData(response.data.items);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (isCampaignPersist) {
      ReferenceDataService.getCampaignVersions(campaignId)
        .then((response) => {
          if (response.data) {
            setData(response.data.items);
            setSelectedVersion({});
          }
        })
        .catch((error) => {});
    }
  }, [isCampaignPersist]);

  const onAreaChange = (event) => {
    const { id, value, label } = event;
    setSelectedVersion(value);
    const version = data.find((item) => item.id == value);
    setVersion(version);
    campaignService
      .getCampaignByVersion(campaignId, label)
      .then((response) => {
        response && response.data && setCampaign(response.data);
      })
      .catch((error) => {});
  };

  return (
    <Select
      id="campaignVersion"
      name="campaignVersion"
      label={"Kampanya Versiyonları"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.version + "", value: item.id };
      })}
      value={selectedVersion}
      isClearable={false}
      error={error}
      sort = {false}
    />
  );
};
export default CampaignVersionsSelect;
