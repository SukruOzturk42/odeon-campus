import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Select from "../../base-component/Select";
import AddCircle from "@material-ui/icons/AddCircle";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import AddPolicySaleRewardCompanyInformationModal from "./AddPolicySaleRewardCompanyInformationModal";
import * as PolicySaleGiftCodeService from "../../../services/PolicySaleGiftCodeService";

const RewardCompanyInformation = (props) => {
  const { onChange, value, md, error, enableAddOperation, isDisabled } = props;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    PolicySaleGiftCodeService.getPolicySaleRewardCompanyInformations()
      .then((response) => {
        response &&
          setData(
            response.map((item) => {
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
            id="rewardCompanyInformationId"
            name="rewardCompanyInformationId"
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
      <AddPolicySaleRewardCompanyInformationModal
        show={showModal}
        setShow={setShowModal}
        setRewardCompanies={setData}
        rewardCompanies={data}
      />
    </>
  );
};
export default RewardCompanyInformation;
