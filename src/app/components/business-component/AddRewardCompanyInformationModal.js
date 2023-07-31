import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Input } from "../base-component/Input";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../context/GlobalState";
import * as CodeUploadService from "../../services/CodeUploadService";

const AddRewardCompanyInformationModal = (props) => {
  const { intl, show, setShow, setRewardCompanies } = props;
  const [rewardCompanyName, setRewardCompanyName] = useState();
  const { user } = useContext(GlobalContext);

  const handleSubmit = (event) => {
      CodeUploadService.createRewardCompanyInformation(rewardCompanyName)
      .then((response) => {
          response && response.data && setRewardCompanies((prevArray) => [
              ...prevArray,
              { label: rewardCompanyName, value: response.data.id },
          ]);
          setShow(false);
          setRewardCompanyName("");
      })
      .catch((error) => {});
  };

  const onAreaChange = (event) => {
    setRewardCompanyName(event.value);
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
              value={rewardCompanyName}
              onChange={onAreaChange}
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
    </div>
  );
};
export default injectIntl(AddRewardCompanyInformationModal);
