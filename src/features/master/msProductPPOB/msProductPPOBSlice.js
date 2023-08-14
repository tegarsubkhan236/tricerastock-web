import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/lib/axios";

export const hitCheckBalance = createAsyncThunk(
    'ppob/checkBalance',
    async () => {
        const response = await instance.get('/digiflazz/cek-saldo');
        return response.data;
    }
);

export const hitPriceList = createAsyncThunk(
    'ppob/priceList',
    async ({priceType, groupBy}) => {
        const response = await instance.get('/digiflazz/price-list',{
            params : {
                type : priceType,
                groupBy: groupBy
            }
        });
        return response.data;
    }
);

const msProductPPOBSlice = createSlice({
    name: 'ppob',
    initialState: {
        balance: [],
        priceList: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(hitCheckBalance.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(hitCheckBalance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.balance = action.payload;
            })
            .addCase(hitCheckBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(hitPriceList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(hitPriceList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.priceList = action.payload;
            })
            .addCase(hitPriceList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    }
})

export default msProductPPOBSlice.reducer