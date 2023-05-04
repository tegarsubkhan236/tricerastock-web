import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";
import {decodeToken} from "../../config/utils/decodeToken";

export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async ({identity, password}) => {
        const response = await instance.post('/auth/login', {
            identity, password
        });
        return response.data
    }
);

const msAuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = decodeToken(action.payload.data);
                state.token = action.payload.data;
            })
            .addCase(postLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
})

export const {logout} = msAuthSlice.actions;

export default msAuthSlice.reducer