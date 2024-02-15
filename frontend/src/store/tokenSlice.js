import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: null,
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
    invalidate: (state) => {
      state.value = null;
    },
  },
});

export const { update, invalidate } = tokenSlice.actions;
export default tokenSlice.reducer;
