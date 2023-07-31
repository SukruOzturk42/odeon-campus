export const validateOwnerProduct = (ownerProduct) => {
    let havePolicyType = false;
    let haveContactRole = false;
    ownerProduct.forEach(item => {
        if (item || item.attributes.length > 0) {
            item.ownerProduct.attributes.map((attribute) => {
                if (attribute.attributeId === 89) {
                    havePolicyType = true;
                }
                if (attribute.attributeId === 87) {
                    haveContactRole = true;
                }
            })
        }
    });

    return {havePolicyType,haveContactRole};
};
