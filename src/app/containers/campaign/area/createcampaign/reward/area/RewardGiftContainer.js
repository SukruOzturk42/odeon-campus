import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import RewardGiftView from "./RewardGiftView";
import * as ObjectUtils from "../../../../../../common/utils/ObjectUtils";

const RewardGiftContainer = (props) => {
  const { onChange, reward } = props;
  const [gift, setGift] = useState(reward.gift ? reward.gift : {});
  const [selectedGift, setSelectedGift] = useState({});
  const [selectedGiftDeliveryType, setSelectedGifDeliveryType] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setGift(reward.gift ? reward.gift : {});
  }, [reward.gift]);

  useEffect(() => {
    if (!ObjectUtils.isEmptyObject(props.error)) {
      setErrors(props.error);
    }
  }, [props.error]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    if (id === "rewardGiftTypeId" && value === undefined) {
      setGift({});
      onChange({ id: "gift", value: {} });
    } else {
      gift[id] = value;
      setGift((prev) => ({ ...prev, ...gift }));
      onChange({ id: "gift", value: gift });
    }
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };



  return (
    <div>
      <RewardGiftView
        gift={gift}
        error={errors}
        onChange={onAreaChange}
        selectedGift={selectedGift}
        setSelectedGift={setSelectedGift}
        setSelectedGifDeliveryType={setSelectedGifDeliveryType}
        selectedGiftDeliveryType={selectedGiftDeliveryType}
      />
    </div>
  );
};

export default injectIntl(RewardGiftContainer);
