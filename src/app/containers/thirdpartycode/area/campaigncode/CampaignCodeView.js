import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../../../context/GlobalState";
import Button from "../../../../components/base-component/Button";
import { Input } from "../../../../components/base-component/Input";
import { Checkbox } from "../../../../components/base-component/CheckBox";
import CampaignCodeTypeSelect from "../../../../components/business-component/code/CampaignCodeTypeSelect";
import CampaignCodeExpirationDatePicker from "../../../../components/business-component/code/CampaignCodeExpirationDatePicker";
import CampaignCodeKindSelect from "../../../../components/business-component/code/CampaignCodeKindSelect";
import FileImport from "../../../../components/business-component/FileImport";

const CampaignCodeView = (props) => {
  const { campaign } = useContext(GlobalContext);
  const { intl, activeSubMenu, onChange, errors, campaignCode, setCampaignCode, 
    isDisabled, selectedCodeType, setSelectedCodeType } = props;

  const onChangePairWithCustomer = () => {
    onChange({ id: "isPairedWithCustomers", value: !campaignCode.isPairedWithCustomers });
    onChange({ id: "codeGenerationCount", value: 0});
  };

  return (
    <div>
      <Row>
        <Input
          id={"codeGroupName"}
          name={"codeGroupName"}
          label={"Kod Kümesi İsmi"}
          md={6}
          disabled={isDisabled}
          onChange={onChange}
          error={errors.codeGroupName}
          value={campaignCode.codeGroupName ? campaignCode.codeGroupName : undefined}
        />
      </Row>
      <Row>
        <CampaignCodeTypeSelect
          value={campaignCode.codeTypeId}
          onChange={onChange}
          error={errors.codeTypeId}
          setSelectedCodeType={setSelectedCodeType}
          isDisabled={isDisabled}
          md={3}
        />
      </Row>
      {selectedCodeType[0] && selectedCodeType[0].name === "SINGLE_USE_CODE" &&
        <Row>
          <Input
            id={"codeCharacterLength"}
            name={"codeCharacterLength"}
            label={"Kod Karakter Sayısı"}
            md={3}
            mode={"number"}
            disabled={isDisabled}
            onChange={onChange}
            error={errors.codeCharacterLength}
            value={campaignCode.codeCharacterLength ? campaignCode.codeCharacterLength : undefined}
          />
          <Input
            id={"codeGenerationCount"}
            name={"codeGenerationCount"}
            label={"Oluşturulacak Kod Sayısı"}
            md={3}
            mode={"number"}
            onChange={onChange}
            error={errors.codeGenerationCount}
            value={campaignCode.codeGenerationCount ? campaignCode.codeGenerationCount : undefined}
            disabled={campaignCode.isPairedWithCustomers}
          />
          <Input
            id={"codeGeneratedCount"}
            name={"codeGeneratedCount"}
            label={"Oluşturulan Kod Sayısı"}
            md={3}
            mode={"number"}
            disabled
            onChange={onChange}
            value={campaignCode.codeGeneratedCount ? campaignCode.codeGeneratedCount : undefined}
          />
        </Row>}
      {selectedCodeType[0] && selectedCodeType[0].name === "UNLIMITED_USE_CODE" &&
        <Row>
          <Input
            id={"code"}
            name={"code"}
            label={"Oluşturulmak İstenen Kod"}
            md={3}
            onChange={onChange}
            error={errors.code}
            value={campaignCode.code ? campaignCode.code : undefined}
          />
        </Row>}
      <Row>
        <CampaignCodeExpirationDatePicker
          value={campaignCode.codeExpirationDate}
          onChange={onChange}
          error={errors.codeExpirationDate}
          isDisabled={isDisabled}
          md={3}
        />
      </Row>
      {selectedCodeType[0] && selectedCodeType[0].name === "SINGLE_USE_CODE" &&
        <Row>
          <Checkbox
            label={"Müşteri ile İlişkilendir"}
            md={12}
            checked={campaignCode.isPairedWithCustomers}
            disabled={isDisabled}
            onChange={onChangePairWithCustomer}
          />
        </Row>}
      {selectedCodeType[0] && ((selectedCodeType[0].name === "SINGLE_USE_CODE" && campaignCode.isPairedWithCustomers === true) || (selectedCodeType[0].name === "THIRD_PARTY_CODE")) &&
        <Row>
          <FileImport
            id={"file"}
            text={"Dosya Yükle"}
            md={3}
            type={"file"}
            onChange={onChange}
            error={errors.file}
          />
        </Row>}
    </div >
  )
}

export default injectIntl(CampaignCodeView);