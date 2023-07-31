import * as ObjectUtils from "../../../../common/utils/ObjectUtils";

export const validate = (campaignGoal, selectedGoalType) => {
  const errors = {};

  if (ObjectUtils.isEmptyProp(campaignGoal.goalTypeId)) {
    errors.goalTypeId = "Hedef Tipi Seçiniz.";
  } else {
    if (
      selectedGoalType.name !== "totalGoal" &&
      ObjectUtils.isEmptyProp(campaignGoal.referenceTypeId)
    ) {
      errors.referenceTypeId = "Hedef Parametresi Seçiniz.";
    }
  }

  return errors;
};
