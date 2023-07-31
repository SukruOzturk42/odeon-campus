import React from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import { Input } from "../../../../components/base-component/Input";
import { Checkbox } from "../../../../components/base-component/CheckBox";
import { getFullName } from "../../../../services/TokenService";
import { Row, Col, Container } from "react-bootstrap";
import CampaignTypeSelect from "../../../../components/business-component/CampaignTypeSelect";
import TagInput from "../../../../components/business-component/TagInput";
import CampaignGroupTypeSelect from "../../../../components/business-component/CampaignGroupTypeSelect";
import CampaignStartDateDatePicker from "../../../../components/business-component/CampaignStartDateDatePicker";
import CampaignEndDateDatePicker from "../../../../components/business-component/CampaignEndDateDatePicker";
import CampaignActionDescriptionContainer from "../createcampaign/actiondescription/CampaignActionDescriptionContainer";
import {TextArea} from "../../../../components/base-component/TextArea";
import Select from "../../../../components/base-component/Select";

const CampaignInformationView = (props) => {
  const {
    intl,
    activeSubMenu,
    onChange,
    campaignInformation,
    setShowCampaignGroupModal,
    onHandleCampanyTypeChange,
    campaign,
    error,
  } = props;
  return (
    <div>
      <PageContentArea title={"Kampanya Detay Bilgileri"}>
        <Row>
          <Col md={12}>
            <Row>
              <Col md={6}>
                <Input
                  id="campaignId"
                  name="campaignId"
                  label={"Kampanya Id"}
                  md={5}
                  value={campaign.id ? campaign.id : undefined}
                  placeholder={campaign.id ? campaign.id : undefined}
                  disabled
                />
                <CampaignGroupTypeSelect
                  onChange={onChange}
                  md={9}
                  value={campaignInformation.campaignGroupId}
                  error={error && error.campaignGroupId}
                />
                <Input
                  id="campaignName"
                  name="campaignName"
                  label={"Kampanya Adı"}
                  onChange={onChange}
                  value={campaignInformation.campaignName}
                  error={error && error.campaignName}
                  infoBoxMessage={'Kanallarda görünen kampanya adıdır, poliçe çıktısına basılır.'}
                  showInfoBox={true}
                  md={5}
                  maxLength={150}
                />
                <Input
                  id="campaignTitle"
                  name="campaignTitle"
                  label={"Kampanya Başlıgı"}
                  onChange={onChange}
                  value={campaignInformation.campaignTitle}
                  error={error && error.campaignTitle}
                  md={5}
                  maxLength={150}
                  infoBoxMessage={'Kampanyanın Anadolu Sigorta içerisinde takip için kullanılan adıdır, kanallarda gözükmez.'}
                  showInfoBox={true}
                />
                <TextArea
                    id="shortDescription"
                    name="shortDescription"
                    label={"Kısa Açıklama"}
                    md={6}
                    onChange={onChange}
                    value={campaignInformation.shortDescription}
                    error={error && error.shortDescription}
                    as="textarea"
                    rows={2}
                    maxLength={255}
                    className={"short-description"}
                />
                <Input
                  id="campaignVersion"
                  name="campaignVersion"
                  label={"Kampanya Versiyon"}
                  value={
                    campaignInformation.version
                      ? campaignInformation.version
                      : 0
                  }
                  md={5}
                  disabled
                />
                {campaign.id && (
                  <>
                    <Input
                      id="campaignApprovalStatusName"
                      name="campaignApprovalStatusName"
                      label={"Kampanya Onay Durumu"}
                      value={
                        campaignInformation.campaignApprovalStatusName
                          ? campaignInformation.campaignApprovalStatusName
                          : ""
                      }
                      md={5}
                      disabled
                    />

                    <Input
                      id="campaignStatusName"
                      name="campaignStatusName"
                      label={"Kampanya  Durumu"}
                      value={
                        campaignInformation.campaignStatusName
                          ? campaignInformation.campaignStatusName
                          : ""
                      }
                      md={5}
                      disabled
                    />
                  </>
                )}
                <CampaignTypeSelect
                  error={error && error.campaignTypeId}
                  md={5}
                  onChange={onHandleCampanyTypeChange}
                  value={campaignInformation.campaignTypeId}
                />
                <TagInput
                  id="tags"
                  name="tags"
                  label={"Kampanya Etiketleri"}
                  onChange={onChange}
                  value={campaignInformation.tags}
                  md={5}
                  tagSize = {10}
                />
                <Checkbox
                  id="hasCustomerLimit"
                  name="hasCustomerLimit"
                  label={"Müşteri Katılım Limiti Var mı?"}
                  onChange={onChange}
                  value={campaignInformation.hasCustomerLimit}
                  error={error && error.hasCustomerLimit}
                  checked={campaignInformation.hasCustomerLimit}
                  md={5}
                />
                {campaignInformation.hasCustomerLimit && (
                  <Input
                    error={error && error.customerLimitSize}
                    id="customerLimitSize"
                    name="customerLimitSize"
                    label={"Limit Sayısı"}
                    value={campaignInformation.customerLimitSize}
                    onChange={onChange}
                    mode={"number"}
                    md={5}
                  />
                )}
              </Col>
              <Col md={6}>
                <CampaignStartDateDatePicker
                  error={error && error.campaignStartDate}
                  onChange={onChange}
                  campaignInformation={campaignInformation}
                  value={campaignInformation.campaignStartDate}
                  disabled={
                    (campaignInformation.campaignApprovalStatusName ===
                      "Onaylandı" &&
                      campaign.id != null) ||
                    (campaignInformation.version &&
                      campaignInformation.version > 0)
                  }
                />

                <CampaignEndDateDatePicker
                  error={error && error.campaignEndDate}
                  campaignInformation={campaignInformation}
                  onChange={onChange}
                  value={campaignInformation.campaignEndDate}
                  campaignStartDate={campaignInformation.campaignStartDate}
                />
                <Input
                  id="campaignOwner"
                  name="campaignOwner"
                  label={"Kampanya Sahibi"}
                  onChange={onChange}
                  value={
                    campaign.id
                      ? campaignInformation.campaignOwner
                      : getFullName()
                  }
                  disabled
                  md={5}
                />
                <CampaignActionDescriptionContainer
                  campaign={campaign}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </PageContentArea>
    </div>
  );
};

export default injectIntl(CampaignInformationView);
