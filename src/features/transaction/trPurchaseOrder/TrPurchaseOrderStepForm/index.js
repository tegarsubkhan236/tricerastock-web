import React, {createContext, useEffect, useState} from "react";
import Parent from "./Parent";
import {fetchProductsWithoutExtraReducers} from "../../../master/msProduct/msProductSlice";
import {useDispatch} from "react-redux";

export const PurchaseOrderStepFormContext = createContext();

const Index = () => {
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [postData, setPostData] = useState({});
    const [initLoading, setInitLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState({
        subTotal: 0,
        tax: 0,
        discount: 0,
        total: 0,
    });

    const fetchProducts = async ({supplier_id, search_text = ""}) => {
        try {
            const data = await dispatch(fetchProductsWithoutExtraReducers({
                page: 1,
                perPage: 999,
                supplier_id: supplier_id,
                search_text: search_text,
            })).unwrap()
            setProducts(data.data.results.map((item) => ({
                key: item.id,
                name: item.name,
                description: item.description,
                sell_price: item.ms_product_prices[0].sell_price,
                buy_price: 0,
                quantity: 0,
            })))
            setInitLoading(false);
            window.dispatchEvent(new Event('resize'));
        } catch (e) {
            console.log(e)
        }
    }

    const countPrice = () => {
        let val = 0;
        for (const item of cartItems) {
            val += item.quantity * item.buy_price;
        }
        setPrice({
            subTotal: val,
            tax: (postData.tax / 100) * val,
            discount: (postData.discount / 100) * val,
            total: (val + ((postData.tax / 100) * val) - ((postData.discount / 100) * val))
        })
    }

    useEffect(() => {
        if (typeof postData?.supplier?.value !== "undefined") {
            fetchProducts({
                supplier_id: postData.supplier.value
            })
            setCartItems([])
        }
    }, [postData?.supplier?.value])

    useEffect(() => {
        countPrice();
    }, [cartItems]);

    const next = () => {
        setCurrentStep(currentStep + 1)
    };
    const prev = () => {
        setCurrentStep(currentStep - 1)
    };

    return (
        <PurchaseOrderStepFormContext.Provider value={{
            currentStep,
            setCurrentStep,
            next,
            prev,
            postData,
            setPostData,
            cartItems,
            setCartItems,
            initLoading,
            setInitLoading,
            products,
            fetchProducts,
            price,
        }}>
            <Parent/>
        </PurchaseOrderStepFormContext.Provider>
    );
};

export default Index;