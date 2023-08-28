import React, {createContext, useEffect, useState} from 'react';
import Parent from "./Parent";
import {CountOrderPrice} from "../../../../config/helper/countOrderPrice";

export const ReceivingOrderFormContext = createContext();

const Index = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [orderPrice, setOrderPrice] = useState({
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });

    useEffect(() => {
        const calculatedOrderPrice = CountOrderPrice(cartItems, roPayload.tax, roPayload.disc);
        setOrderPrice(calculatedOrderPrice);
    }, [cartItems]);

    const next = () => {
        setCurrentStep(currentStep + 1)
    };

    const prev = () => {
        setCurrentStep(currentStep - 1)
    };
    
    return (
        <ReceivingOrderFormContext.Provider value={{
            currentStep, next, prev,
            isSaved, setIsSaved,
            cartItems, setCartItems,
            orderPrice, countOrderPrice
        }}>
            <Parent/>
        </ReceivingOrderFormContext.Provider>
    );
};

export default Index;