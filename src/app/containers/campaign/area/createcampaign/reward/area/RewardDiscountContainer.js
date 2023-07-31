import React, {useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import RewardDiscountView from "./RewardDiscountView";

const RewardDiscountContainer = (props) => {
  const { onChange, reward, rule } = props;
  const [discount, setDiscount] = useState({ discountTypeId: 1 });
  const [selectedDiscount, setSelectedDiscount] = useState({});
  useEffect(() => {
    setDiscount(reward.discount ? reward.discount : { discountTypeId: 1 });
  }, [reward.discount]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    discount[id] = value;
    discount["discountDetailTypeId"] = 1;
    discount["discountTypeId"] = 1;
    setDiscount((prev) => ({ ...prev, ...discount }));
    onChange({ id: "discount", value: discount });
  };

  return (
      <div>
        <RewardDiscountView
            error={props.error}
            discount={discount}
            onChange={onAreaChange}
            setSelectedDiscount={setSelectedDiscount}
            rule={rule}
        />
      </div>
  );
};

export default injectIntl(RewardDiscountContainer);
