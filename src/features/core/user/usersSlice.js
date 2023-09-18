import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/axios";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({page, perPage, column}, thunkAPI) => {
        try {
            let filter = {}
            if ("username" in column){
                filter = {...filter, "user.username": column.username}
            }
            if ("email" in column){
                filter = {...filter, "user.email": column.email}
            }
            const response = await instance.get('/v1/core/user', {
                params: {
                    page: page,
                    limit: perPage,
                    ...filter
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const fetchTemplateUser = createAsyncThunk(
    'users/fetch_template',
    async ({ids}, thunkAPI) => {
        try {
            const response = await instance.get('/v1/core/user', {
                params: {
                    page: 1,
                    limit: 999,
                    ids: ids.map(value => `${value}`).join(','),
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const fetchDetailUsers = createAsyncThunk(
    'users/fetchDetailUsers',
    async ({id}) => {
        const response = await instance.get(`/v1/core/user/${id}`, id);
        return response.data;
    }
);

export const postUser = createAsyncThunk(
    'users/postUser',
    async (postData) => {
        const response = await instance.post('/v1/core/user', postData);
        return response.data
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({id, updatedData}) => {
        const response = await instance.put(`/v1/core/user/${id}`, updatedData);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async ({id}) => {
        const queryString = id.map((itemId) => `id=${itemId}`).join('&');
        await instance.delete(`/v1/core/user?${queryString}`);
        return id;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userData: [],
        userTotalData: 0,
        userModalVisible: false,
        userNodalType: '',
        userSelectedRow: [],
        userFilter: {},
        userStatus: 'idle',
        userCurrentPage: 1,
        userPerPage: 5
    },
    reducers: {
        setUserStatus: (state, action) => {
            state.userStatus = action.payload
        },
        setUserPerPage: (state, action) => {
            state.userStatus = "idle"
            state.userPerPage = action.payload;
        },
        setUserCurrentPage: (state, action) => {
            state.userStatus = "idle"
            state.userCurrentPage = action.payload;
        },
        setUserFilter: (state, action) => {
            state.userStatus = "idle"
            state.userFilter = action.payload
        },
        setUserModalVisible: (state, action) => {
            state.userModalVisible = action.payload
        },
        setUserModalType: (state, action) => {
            state.userModalType = action.payload
        },
        setUserSelectedRow: (state, action) => {
            state.userSelectedRow = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                state.userData = action.payload.data.results.map((item) => ({
                    key: item.id,
                    id: item.id,
                    username: item.username,
                    email: item.email,
                }));
                state.userTotalData = action.payload.data.total;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.userStatus = 'failed';
            })

            .addCase(postUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                const item = action.payload.data
                if (item !== null) {
                    const newItem = {
                        key: item.id,
                        id: item.id,
                        username: item.username,
                        email: item.email,
                        password: item.password
                    }
                    state.userData.unshift(newItem)
                    state.userTotalData++
                }
            })
            .addCase(postUser.rejected, (state) => {
                state.userStatus = 'failed';
            })

            .addCase(updateUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                const item = action.payload.data.user;
                const updatedItem = {
                    key: item.id,
                    id: item.id,
                    username: item.username,
                    email: item.email,
                }
                const index = state.userData.findIndex(user => user.id === updatedItem.id);
                state.userData[index] = updatedItem;
            })
            .addCase(updateUser.rejected, (state) => {
                state.userStatus = 'failed';
            })

            .addCase(deleteUser.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.userStatus = 'idle';
                state.userSelectedRow = [];
            })
            .addCase(deleteUser.rejected, (state) => {
                state.userStatus = 'failed';
            })
    },
});

export const {
    setUserStatus,
    setUserPerPage,
    setUserCurrentPage,
    setUserModalVisible,
    setUserModalType,
    setUserSelectedRow,
    setUserFilter,
} = usersSlice.actions;

export default usersSlice.reducer;