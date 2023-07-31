import React  from "react";
import { injectIntl } from "react-intl";
import ContactGroupSelect from "../../../../../../components/business-component/ContactGroupSelect";
import {Col} from "react-bootstrap";

const CampaignContactGroupContainer = (props) => {
    const { rule,onChange,onParentAreaChange } = props;
    const onAreaChange = (event) => {
        const { id, value } = event;
        onParentAreaChange({
            id: id,
            value: value,
        });
    };
    return (
        <div>
            <Col md={12}>
                <Col md={2} className={"pl-0 contact-group pr-0"}>
                    <ContactGroupSelect
                        value={rule.contactGroupId}
                        onChange={onAreaChange}
                        className={"pl-0 pr-0"}
                        md={12}
                    />
                </Col>
            </Col>
        </div>
    );
};

export default injectIntl(CampaignContactGroupContainer);
