import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Input } from "../base-component/Input";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../context/GlobalState";
import { crateCampaignGroup } from "../../services/campaignGroupService";

const AddCampaignGroupModal = (props) => {
  const { intl, show, setShow, setCampaignGroups } = props;
  const [groupName, setGroupName] = useState();
  const { user } = useContext(GlobalContext);

  const handleSubmit = (event) => {
    crateCampaignGroup(groupName)
      .then((response) => {
        response &&
          response.data &&
          setCampaignGroups((prevArray) => [
            ...prevArray,
            { label: groupName, value: response.data.id },
          ]);
        setShow(false);
        setGroupName("");
      })
      .catch((error) => {});
  };
  const onAreaChange = (event) => {
    setGroupName(event.value);
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
            Kampanya Grubu
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Input
              id="groupName"
              name="groupName"
              label={"Grup İsmi"}
              md={12}
              value={groupName}
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
export default injectIntl(AddCampaignGroupModal);
