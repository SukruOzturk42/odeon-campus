import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select from "../../base-component/Select";
import { getAllActiveDiscountCodeInformation } from "../../../services/CodeUploadService";

const CampaignRewardGiftTicketTypeSelect = (props) => {
  const { onChange, value, md, error, isMandatory } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllActiveDiscountCodeInformation()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return {
                label: item.codeGroupName,
                value: item.id,
              };
            })
          );

        isMandatory &&
          response.data &&
          !value &&
          onChange({
            id: "discountCodeInformationId",
            value: response.data.items[0].id,
          });
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Select
            id="discountCodeInformationId"
            name="discountCodeInformationId"
            label={"İlgili Kod Kümesi"}
            onChange={onChange}
            md={md ? md : 12}
            options={data}
            value={value}
            error={error}
            isClearable={false}
            sort ={false}
          />
        </Col>
      </Row>
    </>
  );
};
export default CampaignRewardGiftTicketTypeSelect;
