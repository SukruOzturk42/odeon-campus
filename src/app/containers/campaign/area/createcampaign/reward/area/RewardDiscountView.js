import React, { useContext, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Input } from "../../../../../../components/base-component/Input";
import Select from "../../../../../../components/base-component/Select";
import Button from "../../../../../../components/base-component/Button";
import DiscountKindSelect from "../../../../../../components/business-component/reward/DiscountKindSelect";
import DiscountCodeInformationSelect from "../../../../../../components/business-component/reward/DiscountCodeInformationSelect";
import { GlobalContext } from "../../../../../../context/GlobalState";
import ReferenceDiscountCodeModal from "../../../../../../components/business-component/reward/ReferenceDiscountCodeModal";

import { Row, Col } from "react-bootstrap";
import DefinedDiscountCodeInformationSelect from "../../../../../../components/business-component/reward/DefinedDiscountCodeInformationSelect";
import {
  isRelatedCampaignRuleGroup,
  isCrossSaleCampaignRuleGroup,
  hasRuleSubProduct,
} from "../../rule/common/RuleUtils";

const RewardDiscountView = (props) => {
  const { discount, onChange, error, definedDiscount, rule } = props;
  const { campaign } = useContext(GlobalContext);

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {campaign.campaignInformation &&
      campaign.campaignInformation.campaignTypeName === "participation" ? (
        <>
          <Row>
            <Col md={6}>
              <DiscountKindSelect
                value={discount.discountKindId}
                type={"participation"}
                md={5}
                onChange={onChange}
              />
            </Col>
            <Col md={6}>
              {discount.discountKindId && (
                <DiscountCodeInformationSelect
                  value={discount.discountCodeInformationId}
                  onChange={onChange}
                  isMandatory={true}
                />
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={12}>
            <Row>
              <Col md={4}>
                <DefinedDiscountCodeInformationSelect
                  value={discount.discountCodeInformationId}
                  onChange={onChange}
                  isMandatory={false}
                  disabled={
                    isCrossSaleCampaignRuleGroup(rule.ownerProduct) ||
                    isRelatedCampaignRuleGroup(rule)
                  }
                  campaign={campaign}
                  rule={rule}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <DiscountKindSelect
                  value={discount.discountKindId}
                  md={12}
                  onChange={onChange}
                />
              </Col>
            </Row>
            {discount.discountKindId && (
              <>
                <Row>
                  <Col md={4}>
                    <Select
                      id="discountDetailTypeId"
                      name="discountDetailTypeId"
                      label={"İndirim Detayı"}
                      options={[{ label: "Ürün", value: 1 }]}
                      value={discount.discountDetailTypeId}
                      isDisabled={true}
                      infoBoxMessage={
                        "İndirimin Uygulanacağı yerin seçimi yapılır."
                      }
                      showInfoBox={true}
                    />
                  </Col>
                  <Col md={4}>
                    {discount.discountKindId && (
                      <Button
                        onClick={() => setShowModal(true)}
                        showInfoBox={true}
                        infoBoxMessage={
                          "İndirim kodu gönderimi yapılan katılım kampanyası seçilir"
                        }
                        disabled={isRelatedCampaignRuleGroup(rule)}
                      >
                        Referans Kampanya
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Select
                      id="discountTypeId"
                      name="discountTypeId"
                      label={"İndirim Tipi"}
                      options={[{ label: "Ürün Sayısına Göre", value: 1 }]}
                      value={discount.discountTypeId}
                      isDisabled={true}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      id="value"
                      name="value"
                      label={"İndirim Değeri"}
                      value={discount.value}
                      md={12}
                      onChange={onChange}
                      error={error && error.value}
                      showInfoBox={true}
                      infoBoxMessage={
                        "İndirim oran/tutar bilgisini giriniz. Örneğin : 10"
                      }
                    />
                  </Col>
                </Row>
                {showModal && (
                  <ReferenceDiscountCodeModal
                    show={showModal}
                    setShow={setShowModal}
                    onOkText={"Tamam"}
                    onHideText={"İptal"}
                    definedDiscount={definedDiscount}
                    onChange={onChange}
                  />
                )}
              </>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default injectIntl(RewardDiscountView);
