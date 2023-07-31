import React, {useState, useEffect, useContext} from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";
import {
  getCampaignRuleGroups,
  getReferenceCampaign,
} from "../../../services/campaignService";

const ReferenceDiscountCodeModal = (props) => {
  const { intl, show, setShow, onChange, md } = props;
  const [campaign, setCampaign] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [campaignRuleGroup, setCampaignRuleGroup] = useState({});
  const [campaignRuleGroups, setCampaignRuleGroups] = useState([]);

  useEffect(() => {
    ReferenceDataService.getCampaignTypes({})
      .then((response) => {
        if (response.data && response.data.items) {
          var participationType = response.data.items.find(
            (item) => item.name === "participation"
          );
          if (participationType) {
            getReferenceCampaign({
            }).then((response) => {
              response.data && setCampaigns(response.data.items);
            });
          }
        }
      })
      .catch((error) => {});
  }, []);

  const onHandleCampaignChange = (event) => {
    const type = campaigns.find((item) => item.campaignId === event.value);
    getCampaignRuleGroups(type.campaignId)
      .then((response) => {
        response.data && setCampaignRuleGroups(response.data.items);
        setCampaign(type)
      })
      .catch((error) => {});
  };

  const onHandleCampaignRuleGroupChange = (event) => {
    const type = campaignRuleGroups.find((item) => item.id === event.value);
    setCampaignRuleGroup(type)
  };

  const handleSubmit = () => {
    if(campaignRuleGroup.ruleGroupReward != null && campaignRuleGroup.ruleGroupReward.discount !=null &&
        campaignRuleGroup.ruleGroupReward.discount.discountCodeInformationId !=null
    ){
      onChange({id:"discountCodeInformationId", value:
        campaignRuleGroup.ruleGroupReward.discount.discountCodeInformationId})
      setShow(false)
    }

  };
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        key={props.show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Referans kampanya
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Select
              id="attributeId"
              name="attributeId"
              label={"Cepteki Kampanyalar"}
              md={md ? md : 12}
              onChange={onHandleCampaignChange}
              options={campaigns.map((item) => {
                return { label: item.campaignName, value: item.campaignId };
              })}
              value={campaign.campaignId}
            />
            {campaign.campaignId && (
              <Select
                id="attributeId"
                name="attributeId"
                label={"Kampanya Durumları"}
                md={md ? md : 12}
                onChange={onHandleCampaignRuleGroupChange}
                options={campaignRuleGroups.map((item) => {
                  return { label: item.name, value: item.id };
                })}
                value={campaignRuleGroup.id}
              />
            )}
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <button
              type="submit"
              form="form2"
              className="btn btn-primary btn-elevate"
              onClick={() => handleSubmit()}
            >
              {props.onOkText
                ? props.onOkText
                : intl.formatMessage({
                    id: "SAVE",
                  })}
            </button>
            <> </>
            <button
              type="button"
              className="btn btn-light btn-elevate"
              onClick={() => setShow(false)}

            >
              {props.onHideText
                ? props.onHideText
                : intl.formatMessage({
                    id: "BACK.TO.THE.PAGE",
                  })}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ReferenceDiscountCodeModal;
