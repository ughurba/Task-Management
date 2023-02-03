import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  user: Record<string, string>;
}
const initialState: initialStateTypes = {
  user: {},
};
const userSlices = createSlice({
  name: "userSlices",
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<Record<string, string>>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {},
  },
});
export const { actions: userActions, reducer: userSlice } = userSlices;
