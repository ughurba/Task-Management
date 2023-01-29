import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  user: Record<string, string>;
}
const initialState: initialStateTypes = {
  user: {},
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<Record<string, string>>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {},
  },
});
export const { actions: userActions } = userSlice;
export default userSlice.reducer;
