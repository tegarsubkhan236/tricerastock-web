import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import TrPurchaseOrderForm from "../../../../features/transaction/trPurchaseOrder/TrPurchaseOrderForm";
import {setPoFormType} from "../../../../features/transaction/trPurchaseOrder/trPurchaseOrderSlice";

const TrPurchaseOrder = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPoFormType("ADD_STEP_FORM"))
    }, [])

    return <TrPurchaseOrderForm/>;
};

export default TrPurchaseOrder;