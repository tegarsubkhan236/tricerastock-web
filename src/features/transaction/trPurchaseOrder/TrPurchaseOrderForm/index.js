import React, {createContext, useEffect, useState} from "react";
import Parent from "./Parent";
import {CountOrderPrice} from "../../../../config/helper/countOrderPrice";

export const PurchaseOrderStepFormContext = createContext();

const Index = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [postData, setPostData] = useState({});
    const [initLoading, setInitLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [orderPrice, setOrderPrice] = useState({
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });

    useEffect(() => {
        const calculatedOrderPrice = CountOrderPrice(cartItems, postData.tax, postData.discount);
        setOrderPrice(calculatedOrderPrice);
    }, [cartItems]);

    const next = () => {
        setCurrentStep(currentStep + 1)
    };
    const prev = () => {
        setCurrentStep(currentStep - 1)
    };

    const resetStep = () => {
        setCurrentStep(0)
        setPostData({})
        setIsSaved(false)
        setCartItems([])
    };

    return (
        <PurchaseOrderStepFormContext.Provider value={{
            currentStep,
            setCurrentStep,
            next,
            prev,
            resetStep,
            postData,
            setPostData,
            cartItems,
            setCartItems,
            isSaved,
            setIsSaved,
            initLoading,
            setInitLoading,
            orderPrice,
        }}>
            <Parent/>
        </PurchaseOrderStepFormContext.Provider>
    );
};

export default Index;