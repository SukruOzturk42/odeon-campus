import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Select from "../../base-component/Select";
import AddCircle from "@material-ui/icons/AddCircle";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import AddRewardCompanyInformationModal from "../AddRewardCompanyInformationModal";
import ReferenceDataService from "../../../services/ReferenceDataService";

const RewardCompanyInformation = (props) => {
  const { onChange, value, md, error, enableAddOperation, isDisabled } = props;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ReferenceDataService.getRewardCompanyInformation()
      .then((response) => {
        response &&
          response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.name, value: item.id };
            }))
      })
      .catch((error) => { });
  }, []);

  const onAreaChange = (event) => {
    onChange(event);
  };

  return (
    <>
      <Row>
        <Col>
          <Select
            id="companyInformationId"
            name="companyInformationId"
            label={"Şirket Bilgisi"}
            md={md ? md : 12}
            onChange={onAreaChange}
            options={data}
            value={value}
            error={error}
            isDisabled={isDisabled}
          />
        </Col>
        {enableAddOperation && enableAddOperation === true && (
          <Col>
            <Tooltip title={"Şirket Bilgisi Ekle"} placement="top-start">
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
      <AddRewardCompanyInformationModal
        show={showModal}
        setShow={setShowModal}
        setRewardCompanies={setData}
      />
    </>
  );
};
export default RewardCompanyInformation;
