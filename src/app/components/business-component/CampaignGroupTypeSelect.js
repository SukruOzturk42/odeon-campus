import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Select from "../base-component/Select";
import AddCircle from "@material-ui/icons/AddCircle";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import AddCampaignGroupModal from "./AddCampaignGroupModal";
import ReferenceDataService from "../../services/ReferenceDataService";

const CampaignGroupTypeSelect = (props) => {
  const { onChange, intl, value, md, error } = props;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ReferenceDataService.getCampaignGroupTypes()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.description, value: item.id };
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
            id="campaignGroupId"
            name="campaignGroupId"
            label={"Kampanya Grubu"}
            onChange={onChange}
            md={md ? md : 12}
            options={data}
            value={value}
            error={error}
          />
        </Col>
        <Col>
          <Tooltip title={"Kampanya Grubu Ekle"} placement="top-start">
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
      </Row>
      <AddCampaignGroupModal
        show={showModal}
        setShow={setShowModal}
        setCampaignGroups={setData}
      />
    </>
  );
};
export default CampaignGroupTypeSelect;
