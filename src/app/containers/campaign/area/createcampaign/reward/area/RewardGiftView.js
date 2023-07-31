import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { Input } from "../../../../../../components/base-component/Input";
import GiftType from "../../../../../../components/business-component/reward/GiftType";
import GiftDeliveryType from "../../../../../../components/business-component/reward/GiftDeliveryType";
import CampaignRewardGiftTicketTypeSelect from "../../../../../../components/business-component/reward/CampaignRewardGiftTicketTypeSelect";
import GiftSendStartType from "../../../../../../components/business-component/reward/GiftSendStartType";
import RewardPaymentType from "../../../../../../components/business-component/reward/RewardPaymentType";
import RewardProductSelect from "../../../../../../components/business-component/reward/RewardProductSelect";
import { Row, Col } from "react-bootstrap";
import RewardGiftSendMethodTypeSelect from "../../../../../../components/business-component/reward/RewardGiftSendMethodTypeSelect";
import LastSendTimeDatePicker from "../../../../../../components/business-component/reward/LastSendTimeDatePicker";
import RewardRoleType from "../../../../../../components/business-component/reward/RewardRoleType";


const RewardDiscountView = (props) => {
  const {
    gift,
    onChange,
    setSelectedGift,
    selectedGift,
    setSelectedGifDeliveryType,
    selectedGiftDeliveryType,
    error,
  } = props;

  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={4}>
              <GiftType
                value={gift.rewardGiftTypeId}
                onChange={onChange}
                setSelectedGift={setSelectedGift}
              />
            </Col>
          </Row>
          {gift.rewardGiftTypeId && selectedGift.name && (
            <>
              <Row>
                <Col md={4}>
                  <RewardRoleType
                    value={gift.rewardRoleId}
                    onChange={onChange}
                    isMandatory={true}ßßS
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Input
                    mode={"positive"}
                    id="value"
                    name="value"
                    label={"Tutar"}
                    value={gift.value}
                    md={12}
                    onChange={onChange}
                    error={error && error.value}
                    showInfoBox={true}
                    infoBoxMessage={"Tutar giriniz. Örneğin : 1500"}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    mode={"positive"}
                    id="totalProductCount"
                    name="totalProductCount"
                    label={"Toplam Ürün Adedi"}
                    value={gift.totalProductCount}
                    md={12}
                    onChange={onChange}
                    error={error && error.totalProductCount}
                    showInfoBox={true}
                    infoBoxMessage={"Toplam ürün adedi giriniz. Örneğin : 150"}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    id="totalCustomerProductCount"
                    name="totalCustomerProductCount"
                    label={"Müşteri Ürün Adedi"}
                    value={gift.totalCustomerProductCount}
                    md={12}
                    mode={"positive"}
                    onChange={onChange}
                    showInfoBox={true}
                    infoBoxMessage={"Müşteri adedi giriniz. Örneğin : 5"}
                  />
                </Col>
              </Row>
              {selectedGift.name && selectedGift.name === "giftTicket" && (
                <>
                  <Row>
                    <Col md={4}>
                      <CampaignRewardGiftTicketTypeSelect
                        label={"Hediye Çeki İsmi"}
                        value={gift.rewardGiftCodeInformationId}
                        md={12}
                        onChange={onChange}
                        enableAddOperation={false}
                        error={error && error.rewardGiftCodeInformationId}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <GiftSendStartType
                        value={gift.rewardGiftDeliveryStartTypeId}
                        md={12}
                        onChange={onChange}
                        error={error && error.rewardGiftDeliveryStartTypeId}
                      />
                    </Col>
                    <Col md={4}>
                      <RewardGiftSendMethodTypeSelect
                        value={gift.sendMethodTypeId}
                        md={12}
                        onChange={onChange}
                        error={error && error.sendMethodTypeId}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Input
                        id="dayAfterDeliveryStart"
                        name="dayAfterDeliveryStart"
                        label={"Kaç gün sonra gönderim sağlansın?"}
                        value={gift.dayAfterDeliveryStart}
                        md={12}
                        mode={"number"}
                        maxLength={16}
                        onChange={onChange}
                        error={error && error.dayAfterDeliveryStart}
                        showInfoBox={true}
                        infoBoxMessage={
                          "Hediye çekinin kaç gün sonra gönderileceğini seçiniz. Örneğin : 3"
                        }
                      />
                    </Col>
                    {gift.sendMethodTypeId &&
                      gift.sendMethodTypeId !== 3 &&
                      gift.sendMethodTypeId !== 4 && (
                        <Col md={6}>
                          <LastSendTimeDatePicker
                            error={error && error.lastSendTime}
                            onChange={onChange}
                            value={gift.lastSendTime}
                          />
                        </Col>
                      )}

                    {gift.sendMethodTypeId &&
                      gift.sendMethodTypeId !== 1 &&
                      gift.sendMethodTypeId !== 2 && (
                        <Col md={6}>
                          <Input
                            id="rewardGiftTemplateId"
                            name="rewardGiftTemplateId"
                            label={"Şablon id giriniz"}
                            value={gift.rewardGiftTemplateId}
                            md={12}
                            maxLength={16}
                            onChange={onChange}
                            mode={"number"}
                            error={error && error.rewardGiftTemplateId}
                            showInfoBox={true}
                            infoBoxMessage={"Şablon id giriniz. Örneğin : 1796"}
                          />
                        </Col>
                      )}
                  </Row>
                  <Row>
                    <Col md={4}>
                      <RewardPaymentType
                        value={gift.rewardGiftPaymentTypeId}
                        md={12}
                        onChange={onChange}
                        error={error && error.rewardGiftPaymentTypeId}
                      />
                    </Col>
                  </Row>
                </>
              )}
              {selectedGift.name && selectedGift.name === "gift" && (
                <Row>
                  <Col md={8}>
                    <RewardProductSelect
                      value={gift.rewardProductId}
                      md={12}
                      onChange={onChange}
                      error={error && error.rewardProductId}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={4}>
                  <GiftDeliveryType
                    value={gift.rewardGiftDeliveryTypeId}
                    onChange={onChange}
                    setSelectedGifDeliveryType={setSelectedGifDeliveryType}
                    error={error && error.rewardGiftDeliveryTypeId}
                  />
                </Col>
                <Col md={4}>
                  {selectedGiftDeliveryType.name === "each_x_customer" && (
                    <Input
                      id="productDeliveryOrder"
                      name="productDeliveryOrder"
                      label={"Müşteri Sayısı"}
                      value={gift.productDeliveryOrder}
                      md={12}
                      onChange={onChange}
                      error={error && error.productDeliveryOrder}
                      mode={"positive"}
                      showInfoBox={true}
                      infoBoxMessage={"Müşteri Sayısı giriniz. Örneğin : 10"}
                    />
                  )}
                  {selectedGiftDeliveryType.name === "custom" && (
                    <Input
                      id="productDeliveryOrder"
                      name="productDeliveryOrder"
                      label={"Hediye Verilme Sırası"}
                      value={gift.productDeliveryOrder}
                      md={12}
                      onChange={onChange}
                      isMandatory={true}
                      error={error && error.productDeliveryOrder}
                      mode={"positive"}
                      showInfoBox={true}
                      infoBoxMessage={
                        "Hediye Verilme Sırası giriniz. Örneğin : 14"
                      }
                    />
                  )}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(RewardDiscountView);
