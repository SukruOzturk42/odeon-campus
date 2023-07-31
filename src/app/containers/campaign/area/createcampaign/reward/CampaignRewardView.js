import React from "react";
import { injectIntl } from "react-intl";
import RewardGiftContainer from "./area/RewardGiftContainer";
import RewardDiscountContainer from "./area/RewardDiscountContainer";
import { Input } from "../../../../../components/base-component/Input";
import Select from "../../../../../components/base-component/Select";
import { Row, Col, Container } from "react-bootstrap";

const CampaignRewardView = (props) => {
  const { intl, activeSubMenu, reward, onChange, error, rule } = props;
  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={12}>
              <RewardDiscountContainer
                error={error ? error.discount : {}}
                onChange={onChange}
                reward={reward}
                rule={rule}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <RewardGiftContainer
                onChange={onChange}
                error={error ? error.gift : {}}
                reward={reward}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default injectIntl(CampaignRewardView);
