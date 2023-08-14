import {createSlice} from "@reduxjs/toolkit";

const trPurchaseOrderSlice = createSlice({
    name: "purchase_orders",
    initialState: {
        poFormType: "",
    },
    reducers: {
        setPoFormType : (state, action) => {
            state.poFormType = action.payload
        },
    },
    extraReducers: {}
})

export const {
    setPoFormType,
} = trPurchaseOrderSlice.actions

export default trPurchaseOrderSlice.reducer;