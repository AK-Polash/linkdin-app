import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },

  reducers: {
    activeUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { activeUser } = userSlice.actions;

export default userSlice.reducer;
