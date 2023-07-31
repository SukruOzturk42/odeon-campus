import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import RuleSelect from "./RuleSelect";
import AttributeSelect from "./AttributeSelect";
import Select from "../base-component/Select";
import Input from "../base-component/Input";
import RuleParameterOperator from "./RuleParameterOperator";
import ParameterValue from "./ParameterValue";

const RuleDetailModal = (props) => {
  const { intl, data, onChange } = props;
  const [show, setShow] = useState(props.show);


  const ruleParameterTypes = [
    {
      label: "Kural",
      value: "Kural",
    },
    {
      label: "Parametre",
      value: "Parametre",
    },
  ];

  const controls = [
    {
      label: "AND",
      value: "AND",
    },
    {
      label: "OR",
      value: "OR",
    },
  ];

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onHide = () => {
    props.setShow(false);
    setShow(false);
  };

  useEffect(() => {
    if (props.show) {
      setShow(true);
    } else {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      key={show}
      size="xl"
    >
      <Modal.Header closeButton>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-elevate"
        >X</button>
      </Modal.Header>
      <Modal.Body>
        <div style={{ pointerEvents: "none", opacity: "0.6" }}>
          {data !== undefined &&
            <Row className={"nopadding-margin"}>
              <Col md={8} className={"nopadding-margin"}>
                <Input
                  id={"ruleName"}
                  value={data.ruleName}
                  label={"Kural İsmi"}
                />
              </Col>
              <Col md={4} className={"nopadding-margin"}>
                <Select
                  id={"conjunctionOperator"}
                  value={data.conjunctionOperator}
                  label={"Kontrol"}
                  options={controls}
                />
              </Col>
            </Row>
          }
          {data !== undefined && data.ruleDetailResponseList.length > 0 && data.ruleDetailResponseList.map((item, index) => {
            return (
              <Row className={"nopadding-margin"}>
                <Col md={2} className={"nopadding-margin"}>
                  <Select
                    id={"type"}
                    value={item.type}
                    label={"Tipi"}
                    options={ruleParameterTypes}
                    isDisabled={true}
                  />
                </Col>
                <Col md={10} className={"nopadding-margin"}>
                  {item.type &&
                    {
                      Kural: (
                        <Col md={4} className={"nopadding-margin"}>
                          <RuleSelect
                            value={item.attributeId}
                          />
                        </Col>
                      ),
                      Parametre: (
                        <Row>
                          <Col md={4} className={"nopadding-margin"}>
                            <AttributeSelect
                              campaignTypeId={item.campaignTypeId}
                              value={item.attributeId}
                            />
                          </Col>
                          <Col md={3} className={"nopadding-margin"}>
                            <RuleParameterOperator
                              value={item.operator}
                              parameterId={item.attributeId}
                            />
                          </Col>
                          <Col md={5} className={"nopadding-margin"}>
                            <ParameterValue
                              value={item.value}
                              parameterId={item.attributeId}
                              operator={item.operator}
                              type={item.type}
                              onChange={onChange}
                            />
                          </Col>
                        </Row>
                      ),
                    }[item.type]
                  }
                </Col>
              </Row>
            )
          })}
        </div>
      </Modal.Body>

    </Modal>
  );
};
export default injectIntl(RuleDetailModal);
