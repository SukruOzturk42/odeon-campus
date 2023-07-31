import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Datatable } from "../../../../components/base-component/Datatable";
import { Input } from "../../../../components/base-component/Input";
import PolicySaleRewardCompanyInformationSelect from "../../../../components/business-component/policysale/PolicySaleRewardCompanyInformationSelect";
import PolicySaleRewardGiftTicketSelect from "../../../../components/business-component/policysale/PolicySaleRewardGiftTicketSelect";
import FileImport from "../../../../components/business-component/FileImport";

const PolicySaleCodeUploadView = (props) => {
  const { intl, activeSubMenu, onChange, code, setCode,
    saveCode, errors } = props;

  return (
    <div>
      <Row>
        <Col md={6}>
          <PolicySaleRewardCompanyInformationSelect
            value={code.rewardCompanyInformationId}
            enableAddOperation={true}
            onChange={onChange}
            error={errors.rewardCompanyInformationId}
          />
        </Col>
        <Col md={6}>
          <PolicySaleRewardGiftTicketSelect
            value={code.rewardGiftTicketTypeId}
            enableAddOperation={true}
            onChange={onChange}
            error={errors.rewardGiftTicketTypeId}
          />
        </Col>
      </Row>
      { code.rewardCompanyInformationId && code.rewardGiftTicketTypeId &&
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

export default injectIntl(PolicySaleCodeUploadView);