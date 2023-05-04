import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({page, perPage}) => {
        const response = await instance.get('/user', {
            params: {
                page: page,
                limit: perPage,
            }
        });
        return response.data;
    }
);

export const postUser = createAsyncThunk(
    'users/postUser',
    async (postData) => {
        const response = await instance.post('/user', postData);
        return response.data
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({id, updatedData}) => {
        const response = await instance.put(`/user/${id}`, updatedData);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async ({id}) => {
        await instance.delete(`/user/${id}`, id);
        return id;
    }
);

const msUsersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        perPage: 10
    },
    reducers: {
        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(postUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                console.log(state.data)
                state.data["data"]["results"].unshift(action.payload.data)
            })
            .addCase(postUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const updatedUser = action.payload.data.user;
                const index = state.data["data"]["results"].findIndex(user => user.id === updatedUser.id);
                state.data["data"]["results"][index] = updatedUser;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = state.data["data"]["results"].filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
    },
});

export const {setCurrentPage, setPerPage} = msUsersSlice.actions;

export default msUsersSlice.reducer;