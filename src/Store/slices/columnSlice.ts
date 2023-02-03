import { IColumns } from "types.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  column: IColumns[];
}
const initialState: initialStateTypes = {
  column: [],
};
const coulmnSlice = createSlice({
  name: "coulmnSlice",
  initialState,
  reducers: {
    setColumn: (state, action: PayloadAction<IColumns[]>) => {
      state.column = action.payload;
    },
  },
});
export const { actions: columnActions, reducer: columnSlice } = coulmnSlice;
