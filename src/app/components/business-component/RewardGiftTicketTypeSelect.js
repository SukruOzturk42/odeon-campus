import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Select from "../base-component/Select";
import AddCircle from "@material-ui/icons/AddCircle";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import AddRewardGiftTicketModal from "./AddRewardGiftTicketModal";
import ReferenceDataService from "../../services/ReferenceDataService";

const RewardGiftTicketTypeSelect = (props) => {
  const { onChange, intl, value, md, error, enableAddOperation, isDisabled } = props;

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ReferenceDataService.getRewardGiftTicketTypes()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.name, value: item.id };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Select
            id="rewardGiftTicketTypeId"
            name="rewardGiftTicketTypeId"
            label={"Müşteriye Sağlanacak Fayda"}
            onChange={onChange}
            md={md ? md : 12}
            options={data}
            value={value}
            error={error}
            isDisabled={isDisabled}
          />
        </Col>
        {enableAddOperation && enableAddOperation === true && (
          <Col>
            <Tooltip title={"Fayda Türü Ekle"} placement="top-start">
              <Fab
                size="small"
                color={"primary"}
                aria-label="Add"
                onClick={() => setShowModal(true)}
              >
                <AddCircle></AddCircle>
              </Fab>
            </Tooltip>
          </Col>
        )}
      </Row>
      <AddRewardGiftTicketModal
        show={showModal}
        setShow={setShowModal}
        setGiftTickets={setData}
      />
    </>
  );
};
export default RewardGiftTicketTypeSelect;
