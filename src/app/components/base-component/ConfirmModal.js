import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";

const ConfirmModal = (props) => {
  const { intl } = props;
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onHide = () => {
    setShow(false);
    props.setShow(false);
  };
  const onOk = () => {
    props.onOk();
    setShow(false);
    props.setShow(false);
  };
  useEffect(() => {
    if (props.show) {
      setShow(true);
    } else {
      onHide();
    }
  }, [props.show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      key={show}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>{props.bodyMessage}</span>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-elevate"
            onClick={onOk}
          >
            Tamam
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Geri
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default injectIntl(ConfirmModal);
