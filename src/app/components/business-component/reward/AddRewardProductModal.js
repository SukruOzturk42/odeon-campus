import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Input } from "../../base-component/Input";
import { injectIntl } from "react-intl";
import { crateRewardProduct } from "../../../services/rewardService";
const AddRewardProductModal = (props) => {
  const { intl, show, setShow, setRewardProducts } = props;
  const [productName, setProductName] = useState();

  const handleSubmit = (event) => {
    crateRewardProduct(productName)
      .then((response) => {
        response &&
          response.data &&
          setRewardProducts((prevArray) => [
            ...prevArray,
            { label: productName, value: response.data.id },
          ]);
        setShow(false);
        setProductName("");
      })
      .catch((error) => {});
  };
  const onAreaChange = (event) => {
    setProductName(event.value);
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
            Hediye Ürün
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Input
              id="productName"
              name="productName"
              label={"Ürün İsmi"}
              md={12}
              value={productName}
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
export default injectIntl(AddRewardProductModal);
