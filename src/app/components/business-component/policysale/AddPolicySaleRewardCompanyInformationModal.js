import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Input } from "../../base-component/Input";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../../context/GlobalState";
import * as PolicySaleGiftCodeService from "../../../services/PolicySaleGiftCodeService";
import { SuccessModal } from "../../base-component/SuccessModal";

const AddPolicySaleRewardCompanyInformationModal = (props) => {
  const { intl, show, setShow, setRewardCompanies, rewardCompanies } = props;
  const [rewardCompanyName, setRewardCompanyName] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useContext(GlobalContext);

  const handleSubmit = (event) => {
    if (rewardCompanyName !== undefined && rewardCompanyName !== null && rewardCompanyName !== "") {
      PolicySaleGiftCodeService.createPolicySaleRewardCompanyInformation(rewardCompanyName)
        .then((response) => {
          response && setRewardCompanies((prevArray) => [
            ...prevArray,
            { label: rewardCompanyName, value: response.id },
          ]);
          setShow(false);
          if (rewardCompanies.filter(ticket => ticket.label === rewardCompanyName).length === 0) {
            setShowSuccessModal(true);
          }
          setRewardCompanyName("");
        })
        .catch((error) => { });
    } else {
      setShowWarning(true);
    }
  };

  const onAreaChange = (event) => {
    setRewardCompanyName(event.value);
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
            Şirket Bilgisi
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Input
              id="rewardCompanyName"
              name="rewardCompanyName"
              label={"Şirket Bilgisi"}
              md={12}
              maxLength={50}
              value={rewardCompanyName}
              onChange={onAreaChange}
              error={showWarning ? "Şirket Bilgisi Giriniz." : ""}
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
export default injectIntl(AddPolicySaleRewardCompanyInformationModal);
