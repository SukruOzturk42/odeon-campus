import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export const SuccessModal = (props) => {
  const [show, setShow] = useState(props.show);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onHide = () => {
    props.setShow(false);
    setShow(false);
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
          {props.title ? props.title : "Sonuç"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body ? (
          <span>{props.body}</span>
        ) : (
          <span>İşleminiz başarı ile gerçekleşti.</span>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            {props.onHideText ? props.onHideText : "Tamam"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
