import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Select from "../../base-component/Select";
import AddCircle from "@material-ui/icons/AddCircle";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import AddRewardProductModal from "./AddRewardProductModal";
import { getRewardGiftProducts } from "../../../services/rewardService";

const RewardProductSelect = (props) => {
  const { onChange, intl, value, md, error } = props;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRewardGiftProducts()
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
            id="rewardProductId"
            name="rewardProductId"
            label={"Ürün"}
            onChange={onChange}
            md={md ? md : 12}
            options={data}
            value={value}
            error={error}
          />
        </Col>
        <Col className={"mt-6"}>
          <Tooltip title={"Ürün Ekle"} placement="top-start">
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
      <AddRewardProductModal
        show={showModal}
        setShow={setShowModal}
        setRewardProducts={setData}
      />
    </>
  );
};
export default RewardProductSelect;
