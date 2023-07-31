import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select from "../../base-component/Select";
import { getAllActiveDiscountCodeInformation } from "../../../services/CodeUploadService";

const DefinedDiscountCodeInformationSelect = (props) => {
  const { onChange, value, md, error, isMandatory,campaign } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllActiveDiscountCodeInformation()
      .then((response) => {
        response.data &&
          setData(
              filteredDiscountCodes(response.data).map((item) => {
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

  const filteredDiscountCodes = (data) => {
      let tempList = [];
      if(props.rule.ruleGroupReward!=null && props.rule.ruleGroupReward.discount !== null
          && props.rule.ruleGroupReward.discount.discountCodeInformationId!==null){
          data.items.forEach(item => {
              if(!item.isUsed || item.id === props.rule.ruleGroupReward.discount.discountCodeInformationId){
                  tempList.push(item);
              }
          })
          return  tempList;

      }else{
          data.items.forEach(item => {
              if(!item.isUsed){
                  tempList.push(item);
              }
          })
          return tempList;
      }
  }
  return (
    <>
      <Row>
        <Col>
          <Select
            id="discountCodeInformationId"
            name="discountCodeInformationId"
            label={"Tanımlanmış Kod Kümesi"}
            onChange={onChange}
            md={md ? md : 12}
            options={data}
            value={value}
            error={error}
            isClearable={true}
            isDisabled={props.disabled}
            sort ={false}
          />
        </Col>
      </Row>
    </>
  );
};
export default DefinedDiscountCodeInformationSelect;
