import React from "react";
import { injectIntl } from "react-intl";
import { Button } from "../../../../components/base-component/Button";
import CopyCampaignButton from "../../../../components/business-component/CopyCampaignButton";
import NewVersionCampaignButton from "../../../../components/business-component/NewVersionCampaignButton";
import RoleActionSelect from "../../../../components/business-component/RoleActionSelect";
import CampaignVersionsSelect from "../../../../components/business-component/CampaignVersionsSelect";
import AuthorizedArea from "../../../../components/business-component/AuthorizedArea";

import { Row, Col } from "react-bootstrap";

const CampaignActionView = (props) => {
  const {
    onHandleSaveCampaign,
    campaign,
    onChange,
    onHandleNewVersionButton,
    onHandleCopyCampaignButton,
    isCampaignPersist,
    version,
  } = props;
  return (
    <div>
      <Row>
        {campaign.id && campaign.campaignInformation && (
          <Col md={9}>
            <Row>
              <Col md={5}>
                <RoleActionSelect
                  campaignStatusId={
                    campaign.campaignInformation.campaignStatusId
                  }
                  campaignApprovalStatusId={
                    campaign.campaignInformation.campaignApprovalStatusId
                  }
                  campaignCreateMode={campaign.campaignInformation.createMode}
                  onChange={onChange}
                  value={campaign ? campaign.actionId : null}
                  version={version}
                />
              </Col>
              <Col md={3}>
                <CopyCampaignButton
                  id={"updateCampaignVersion"}
                  name={"updateCampaignVersion"}
                  label={"Düzenle"}
                  md={6}
                  onClick={onHandleCopyCampaignButton}
                />
              </Col>
              <Col md={3}>
                <AuthorizedArea authKey={"EDIT"}>
                  <NewVersionCampaignButton
                    id={"createCampaingCopy"}
                    name={"createCampaingCopy"}
                    label={"Kopya Olustur"}
                    md={6}
                    onClick={onHandleNewVersionButton}
                    disabled={!isCampaignPersist}
                  />
                </AuthorizedArea>
              </Col>
              <Col md={3}>
                <CampaignVersionsSelect campaignId={campaign.id} />
              </Col>
            </Row>
          </Col>
        )}

        <Col md={3}>
          <Button
            id="campaignId"
            name="campaignId"
            value={"Kaydet"}
            md={12}
            onClick={onHandleSaveCampaign}
            disabled={version && !version.isActiveVersion}
            title={"Alanların Hepsi Kayıt Edilir"}
          >
            Kaydet
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(CampaignActionView);
