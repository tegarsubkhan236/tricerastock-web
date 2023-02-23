import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {id: 1, value: "jack"},
    {id: 2, value: "lucy"},
    {id: 3, value: "brown"},
]

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers:{}
})

export const getAllUser = (state) => state.users;
export default userSlice.reducer