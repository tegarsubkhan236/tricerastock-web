import React, {createContext, useEffect, useState} from "react";
import Parent from "./Parent";
import {CountOrderPrice} from "../../../../helper/countOrderPrice";

export const PurchaseOrderStepFormContext = createContext();

const Index = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [postData, setPostData] = useState({});
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderPrice, setOrderPrice] = useState({
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });
    const [prevSupplierValue, setPrevSupplierValue] = useState(0);
    const [initLoading, setInitLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const calculatedOrderPrice = CountOrderPrice(cartItems, postData.tax, postData.discount);
        setOrderPrice(calculatedOrderPrice);
    }, [cartItems, postData.tax, postData.discount]);

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
            prevSupplierValue,
            setPrevSupplierValue,
            products,
            setProducts,
            orderPrice,
        }}>
            <Parent/>
        </PurchaseOrderStepFormContext.Provider>
    );
};

export default Index;