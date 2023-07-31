import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import { Input } from "../../../../components/base-component/Input";
import RewardCompanyInformation from "../../../../components/business-component/reward/RewardCompanyInformation";
import RewardGiftTicketTypeSelect from "../../../../components/business-component/RewardGiftTicketTypeSelect";
import FileImport from "../../../../components/business-component/FileImport";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

const CodeUploadView = (props) => {
  const { intl, activeSubMenu, onChange, code, setCode,
    saveCode, errors } = props;

  return (
    <div>
      <Row>
        <Col md={6}>
          <RewardCompanyInformation
            value={code.companyInformationId}
            enableAddOperation={true}
            onChange={onChange}
            error={errors.companyInformationId}
          />
        </Col>
        <Col md={6}>
          <RewardGiftTicketTypeSelect
            value={code.rewardGiftTicketTypeId}
            enableAddOperation={true}
            onChange={onChange}
            error={errors.rewardGiftTicketTypeId}
          />
        </Col>
      </Row>
      {code.companyInformationId && code.rewardGiftTicketTypeId &&
        <Row>
          <FileImport
            id={"campaignFile"}
            text={"Dosya Yükle"}
            md={3}
            type={"file"}
            onChange={onChange}
            error={errors.campaignFile}
          />
        </Row>
      }
    </div>
  );
}

export default injectIntl(CodeUploadView);