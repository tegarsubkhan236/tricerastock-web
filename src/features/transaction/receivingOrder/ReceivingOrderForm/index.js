import React, {createContext, useEffect, useState} from 'react';
import Parent from "./Parent";
import {CountOrderPrice} from "../../../../helper/countOrderPrice";

export const ReceivingOrderFormContext = createContext();

const Index = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [postData, setPostData] = useState({});
    const [postError, setPostError] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [orderPrice, setOrderPrice] = useState({
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });
    const [initLoading, setInitLoading] = useState(false);
    const [isExecuted, setIsExecuted] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const calculatedOrderPrice = CountOrderPrice(cartItems, postData.tax, postData.disc);
        setOrderPrice(calculatedOrderPrice);
    }, [cartItems, postData.tax, postData.disc]);

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
        <ReceivingOrderFormContext.Provider value={{
            currentStep,
            setCurrentStep,
            next,
            prev,
            resetStep,
            postData,
            setPostData,
            postError,
            setPostError,
            cartItems,
            setCartItems,
            isSaved,
            setIsSaved,
            initLoading,
            setInitLoading,
            isExecuted,
            setIsExecuted,
            orderPrice,
        }}>
            <Parent/>
        </ReceivingOrderFormContext.Provider>
    );
};

export default Index;