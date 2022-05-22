import { createSlice } from "@reduxjs/toolkit";

export const arraySlice = createSlice({
    name: "array",
    initialState: {
        array: null,
        err: null
    },

    reducers: {
        add: (state, action) => {
            state.user = action.payload;
        },
        remove: (state) => {
            state.user = null
        }
    }
});

export const { add, remove } = arraySlice.actions;

export const selectArray = (state) => state.array;

export default arraySlice.reducer;