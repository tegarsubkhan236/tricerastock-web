import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/lib/axios";

export const postRo = createAsyncThunk(
    'ro/post',
    async ({postData}, thunkAPI) => {
        try {
            const response = await instance.post('/v1/transaction/receiving_order/', postData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

const trReceivingOrderSlice = createSlice({
    name: "receiving_orders",
    initialState: {
        roPayload : {},
        roErrors: {},
        roStatus : "idle",
    },
    reducers: {
        setRoPayload: (state, action) => {
            state.roPayload = action.payload;
        },
        setRoErrors: (state, action) => {
            state.roErrors = action.payload;
        },
    },
    extraReducers: {
        [postRo.pending] : (state) => {
            state.roStatus = "pending"
        },
        [postRo.fulfilled] : (state) => {
            state.roStatus = "succeeded"
        },
        [postRo.rejected] : (state) => {
            state.roStatus = "failed"
        }
    }
})

export const {
    setRoPayload,
    setRoErrors,
} = trReceivingOrderSlice.actions

export default trReceivingOrderSlice.reducer;