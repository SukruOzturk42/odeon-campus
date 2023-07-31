import CustomerContainer from "./area/customer/CustomerContainer";
import PolicySaleCodeUploadContainer from "./area/giftcode/PolicySaleCodeUploadContainer";
import PolicySaleCampaignCustomerDetailContainer
    from "./area/policysalecampaigncustomerdetail/PolicySaleCampaignCustomerDetailContainer";

export const cmSubMenuRoutes = {
    "campaigns-sub-menu-gift-code": PolicySaleCodeUploadContainer,
    "campaigns-sub-menu-customer": CustomerContainer,
    "campaigns-sub-menu-policy-sale-reward-customer-detail": PolicySaleCampaignCustomerDetailContainer,
};
export const subMenus = [
    {
        title: "Kod Ekleme",
        component: "test",
        name: "Kod Ekleme",
        menuRoute: "campaigns-sub-menu-gift-code",
    },
    {
        title: "Müşteri Liste Ekleme",
        component: "test",
        name: "Müşteri Liste Ekleme",
        menuRoute: "campaigns-sub-menu-customer",
    },

];