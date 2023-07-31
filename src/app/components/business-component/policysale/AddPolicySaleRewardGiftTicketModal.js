import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Input } from "../../base-component/Input";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../../context/GlobalState";
import * as PolicySaleGiftCodeService from "../../../services/PolicySaleGiftCodeService";
import { SuccessModal } from "../../base-component/SuccessModal";

const AddPolicySaleRewardGiftTicketModal = (props) => {
  const { intl, show, setShow, setGiftTickets, giftTickets } = props;
  const [giftTicketName, setGiftTicketName] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const { user } = useContext(GlobalContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (event) => {
    if (giftTicketName !== undefined && giftTicketName !== null && giftTicketName !== "") {
      PolicySaleGiftCodeService.createPolicySaleRewardGiftTicket(giftTicketName)
        .then((response) => {
          response && setGiftTickets((prevArray) => [
            ...prevArray,
            { label: giftTicketName, value: response.data },
          ]);
          setShow(false);
          if (giftTickets.filter(ticket => ticket.label === giftTicketName).length === 0) {
            setShowSuccessModal(true);
          }
          setGiftTicketName("");
        })
        .catch((error) => { });
    } else {
      setShowWarning(true);
    }
  };
  const onAreaChange = (event) => {
    setGiftTicketName(event.value);
    setShowWarning(false);
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        key={props.show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Müşteriye Sağlanacak Fayda
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Input
              id="giftTicketName"
              name="giftTicketName"
              label={"Fayda İsmi"}
              md={12}
              value={giftTicketName}
              onChange={onAreaChange}
              error={showWarning ? "Fayda İsmi Giriniz." : ""}
            />
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <button
              type="submit"
              form="form2"
              className="btn btn-primary btn-elevate"
              onClick={handleSubmit}
            >
              {props.onOkText
                ? props.onOkText
                : intl.formatMessage({
                  id: "SAVE",
                })}
            </button>
            <> </>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="btn btn-light btn-elevate"
            >
              {props.onHideText
                ? props.onHideText
                : intl.formatMessage({
                  id: "BACK.TO.THE.PAGE",
                })}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <SuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
      />
    </div>
  );
};
export default injectIntl(AddPolicySaleRewardGiftTicketModal);
