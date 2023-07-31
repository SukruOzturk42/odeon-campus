import * as ObjectUtils from "../../../../../common/utils/ObjectUtils";
import { isRuleExist, validateSalesCampaign } from "../rule/common/RuleUtils";
export const validate = (campaignRuleGroups, campaignInformation) => {
  const errors = [];
  if (!campaignRuleGroups || campaignRuleGroups.length <= 0) {
    errors.ruleGroups = "Koşul tanımlaması yapınız.";
  } else {
    campaignRuleGroups.map((item, index) => {
      {
        errors[index] = validateRuleGroup(item, campaignInformation);
        if (
          campaignInformation.campaignTypeId === 2 &&
          !validateSalesCampaign(item)
        ) {
          errors.ruleGroups =
            "Müşteri kampanyaları için poliçe tipi girilmesi zorunludur.";
        }
      }
    });
  }
  return errors;
};

const validateRuleGroup = (campaignRuleGroup) => {
  const errors = {};
  if (ObjectUtils.isEmptyProp(campaignRuleGroup.name)) {
    errors.name = "Koşul İsmini Giriniz.";
  }
  if (!ObjectUtils.isEmptyProp(campaignRuleGroup.ownerProduct)) {
    errors.ownerProduct = validateOwnerRuleGroup(
      campaignRuleGroup.ownerProduct
    );
  }
  if (!ObjectUtils.isEmptyProp(campaignRuleGroup.relatedCooperation)) {
    errors.relatedCooperation = validateRelatedCoorp(
      campaignRuleGroup.relatedCooperation
    );
  }
  if (
    ObjectUtils.isEmptyProp(campaignRuleGroup.attributes) ||
    campaignRuleGroup.attributes.length <= 0
  ) {
    errors.attribute = "Parametre Ekleyin";
  }
  if (ObjectUtils.isEmptyProp(campaignRuleGroup.attributes)) {
    errors.attributes = validateRules(campaignRuleGroup.attributes);
  }
  if (!ObjectUtils.isEmptyObject(campaignRuleGroup.ruleGroupReward)) {
    errors.ruleGroupReward = {};
    if (
      !ObjectUtils.isEmptyObject(campaignRuleGroup.ruleGroupReward.discount) &&
      !ObjectUtils.isEmptyProp(
        campaignRuleGroup.ruleGroupReward.discount.discountKindId
      )
    ) {
      errors.ruleGroupReward.discount = validateRewardDiscount(
        campaignRuleGroup.ruleGroupReward.discount
      );
    }
    if (
      !ObjectUtils.isEmptyObject(campaignRuleGroup.ruleGroupReward.gift) &&
      !ObjectUtils.isEmptyProp(
        campaignRuleGroup.ruleGroupReward.gift.rewardGiftTypeId
      )
    ) {
      errors.ruleGroupReward.gift = validateRewardGift(
        campaignRuleGroup.ruleGroupReward.gift
      );
    }
  }

  if (!ObjectUtils.isEmptyProp(campaignRuleGroup.attributes)) {
    errors.attributes = validateRules(campaignRuleGroup.attributes);
  }
  return errors;
};

const validateOwnerRuleGroup = (ownerProduct) => {
  const errors = {};

  if (ObjectUtils.isNonUndefinedOrNonNull(ownerProduct.attributes)) {
    if (ObjectUtils.isEmptyProp(ownerProduct.conjunctionOperator)) {
      errors.conjunctionOperator = "Kontrol Tipini Seçiniz";
    }
    errors.attributes = validateRules(ownerProduct.attributes);
  }

  if (ownerProduct.attributes) {
    if (
      !isRuleExist(ownerProduct.attributes, 95) &&
      !isRuleExist(ownerProduct.attributes, 89)
    ) {
      errors.ownerProducts =
        "Ürün sahipliğinde Müşteri Rolü ve Müşteri ürün sahipliği seçiniz.";
    } else if (!isRuleExist(ownerProduct.attributes, 95)) {
      errors.ownerProducts =
        "Ürün Sahipliğinde Müşteri ürün sahipliği parametresini seçiniz.";
    } else if (!isRuleExist(ownerProduct.attributes, 95)) {
      errors.ownerProducts =
        "Ürün Sahipliğinde Müşteri Rolü parametresini seçiniz";
    }
  }

  return errors;
};
const validateRelatedCoorp = (relatedCoorp) => {
  const errors = {};

  if (ObjectUtils.isNonUndefinedOrNonNull(relatedCoorp.attributes)) {
    if (ObjectUtils.isEmptyProp(relatedCoorp.conjunctionOperator)) {
      errors.conjunctionOperator = "Kontrol Tipini Seçiniz";
    }
    errors.attributes = validateRules(relatedCoorp.attributes);
  }

  return errors;
};

const validateRewardDiscount = (discount) => {
  const errors = {};
  if (
    ObjectUtils.isEmptyProp(discount.value) &&
    discount.discountKindId !== 4
  ) {
    errors.value = "İndirim Degeri Giriniz.";
  }


  return errors;
};
const validateRewardGift = (gift) => {
  const errors = {};
  if (ObjectUtils.isEmptyProp(gift.value)) {
    errors.value = "Hediye Degeri  Giriniz";
  }
  if (!ObjectUtils.isNonUndefinedOrNonNull(gift.rewardRoleId)) {
    errors.discountRoleId = "Kazanım Rol Seçiniz";
  }
  if (gift.rewardGiftTypeName === "giftTicket") {
    if (ObjectUtils.isEmptyProp(gift.rewardGiftCodeInformationId)) {
      errors.rewardGiftCodeInformationId = "Hediye Çeki Seciniz";
    }
    if (ObjectUtils.isEmptyProp(gift.rewardGiftDeliveryStartTypeId)) {
      errors.rewardGiftDeliveryStartTypeId =
        "Hediye Çeki Başlangıç Yöntemi Seciniz";
    }
    if (ObjectUtils.isEmptyProp(gift.sendMethodTypeId)) {
      errors.sendMethodTypeId = "Hediye Çeki Gönderim Yöntemi Seciniz";
    }
    if (
      ObjectUtils.isEmptyProp(gift.lastSendTime) &&
      gift.sendMethodTypeId !== 3 &&
      gift.sendMethodTypeId !== 4
    ) {
      errors.lastSendTime = "Son Gösterim Tarihi Giriniz";
    }
    if (
      ObjectUtils.isEmptyProp(gift.rewardGiftTemplateId) &&
      gift.sendMethodTypeId !== 1 &&
      gift.sendMethodTypeId !== 2
    ) {
      errors.rewardGiftTemplateId =
        "Noc ekibinden aldığınız id bilgisini bu alana giriniz";
    }
    if (ObjectUtils.isEmptyProp(gift.dayAfterDeliveryStart)) {
      errors.dayAfterDeliveryStart =
        "Kaç gün sonra gönderim yapılacağı bilgisi giriniz. ";
    }
    if (ObjectUtils.isEmptyProp(gift.rewardGiftPaymentTypeId)) {
      errors.rewardGiftPaymentTypeId = "Hediye Çeki Hakediş Yöntemi Seciniz";
    }
  } else if (gift.rewardGiftTypeName === "gift") {
    if (ObjectUtils.isEmptyProp(gift.rewardProductId)) {
      errors.rewardProductId = "Hediye Çeki Seciniz";
    }
  }
  if (ObjectUtils.isEmptyProp(gift.rewardGiftDeliveryTypeId)) {
    errors.rewardGiftDeliveryTypeId = "Hediye Verilme Şekli Seciniz";
  } else {
    if (gift.rewardGiftDeliveryTypeName === "custom") {
      if (ObjectUtils.isEmptyProp(gift.productDeliveryOrder)) {
        errors.productDeliveryOrder = "Hediye Verilme Sırasını Giriniz";
      }
    } /*else if (gift.rewardGiftDeliveryTypeName === "each_x_customer") {
      if (ObjectUtils.isEmptyProp(gift.customerCount)) {
        errors.customerCount = "Müşteri Sayısını Giriniz";
      }
    }*/
  }
  return errors;
};

export const validateRules = (rules) => {
  const errors = [];
  rules.map((item, index) => {
    {
      errors[index] = validateRule(item);
    }
  });
  return errors;
};

export const validateRule = (rule) => {
  const errors = {};
  if (ObjectUtils.isEmptyProp(rule.type)) {
    errors.type = "Parametre Tipini Seçiniz.";
  } else {
    if (rule.type === "RULE") {
      if (ObjectUtils.isEmptyProp(rule.attributeId)) {
        errors.type = "Kural Seçiniz.";
      }
    } else {
      if (ObjectUtils.isEmptyProp(rule.attributeId)) {
        errors.attributeId = "Parametre  Seçiniz.";
      }
      if (
        !ObjectUtils.isEmptyProp(rule.attributeId) &&
        ObjectUtils.isEmptyProp(rule.operator)
      ) {
        errors.operator = "Koşul Seçiniz.";
      }
      if (
        !ObjectUtils.isEmptyProp(rule.attributeId) &&
        !ObjectUtils.isEmptyProp(rule.operator) &&
        ObjectUtils.isEmptyProp(rule.value)
      ) {
        errors.value = "Deger Seçiniz.";
      }
    }
  }
  return errors;
};
