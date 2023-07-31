import React, { useState } from "react";
import Button from "../../../../components/base-component/Button";
import { Input } from "../../../../components/base-component/Input";
import { Row, Col } from "react-bootstrap";
import { SuccessModal } from "../../../../components/base-component/SuccessModal";

export const MessageManagementView = (props) => {

  const { message, onChange, errors, onClick, exportMessages, showSuccessModal, setShowSuccessModal } = props;

  return (
    <div>
      <>
        <Row>
          <Input
            id={"code"}
            name={"code"}
            label={"Mesaj Kodu"}
            md={4}
            onChange={onChange}
            error={errors.code}
            value={message.code ? message.code : undefined}

          />
        </Row>
        <Row>
          <Input
            id={"key"}
            name={"key"}
            label={"Key"}
            md={4}
            onChange={onChange}
            error={errors.key}
            value={message.key ? message.key : undefined}

          />
        </Row>
        <Row>
          <Input
            id={"description"}
            name={"description"}
            label={"Mesaj Açıklaması"}
            md={4}
            onChange={onChange}
            error={errors.description}
            value={message.description ? message.description : undefined}
          />
        </Row>
        <Row>
          <Input
            id={"note"}
            name={"note"}
            label={"Mesaj Notu"}
            md={4}
            onChange={onChange}
            error={errors.note}
            value={message.note ? message.note : undefined}
          />
          <Button
            md={2}
            id="messageId"
            name="messageId"
            value={"Kaydet"}
            onClick={onClick}
          >
            Kaydet
          </Button>
          <Col md={2} >
            <Button
              id="exportCampaign"
              name="exportCampaign"
              md={12}
              label={"Dışa Aktar"}
              onClick={exportMessages}
              text={"Dışa Aktar"}></Button>
          </Col>
        </Row>
      </>
      <SuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
      />
    </div>
  )
}

export default MessageManagementView;
