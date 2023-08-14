import React from 'react';
import {useSelector} from "react-redux";
import TrPurchaseOrderStepForm from "./TrPurchaseOrderStepForm";

const TrPurchaseOrderForm = () => {
    const {poFormType} = useSelector((state) => state.purchaseOrders);

    const RenderForm = () => {
        if (poFormType === "ADD_STEP_FORM") {
            return <TrPurchaseOrderStepForm/>
        }
    }

    return (
        <RenderForm/>
    );
};

export default TrPurchaseOrderForm;