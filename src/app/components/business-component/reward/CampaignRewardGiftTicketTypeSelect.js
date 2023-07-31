import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select from "../../base-component/Select";
import { getAllGiftCodeInformation } from "../../../services/CodeUploadService";

const CampaignRewardGiftTicketTypeSelect = (props) => {
  const { onChange, intl, value, md, error, enableAddOperation } = props;

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllGiftCodeInformation()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return {
                label:
                  item.companyInformationName +
                  "-" +
                  item.rewardGiftTicketTypeName,
                value: item.id,
              };
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
            id="rewardGiftCodeInformationId"
            name="rewardGiftCodeInformationId"
            label={"Hediye Çeki İsmi"}
            onChange={onChange}
            md={md ? md : 12}
            options={data}
            value={value}
            error={error}
          />
        </Col>
      </Row>
    </>
  );
};
export default CampaignRewardGiftTicketTypeSelect;
