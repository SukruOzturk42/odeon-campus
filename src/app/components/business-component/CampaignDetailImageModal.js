import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

const CampaignDetailImageModal = (props) => {
  const { intl, imageUrl, setImageUrl} = props;
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onHide = () => {
    props.setShow(false);
    setShow(false);
    setImageUrl(null);
  };

  useEffect(() => {
    if (props.show) {
      setShow(true);
    } else {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      key={show}
      className={"detail-image-modal"}
    >
      <Modal.Header closeButton>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-elevate"
        >X</button>
      </Modal.Header>
      <Modal.Body>
        <Row className={"mt-1"}>
          <img src={imageUrl} />
        </Row>
      </Modal.Body>

    </Modal>
  );
};
export default injectIntl(CampaignDetailImageModal);
