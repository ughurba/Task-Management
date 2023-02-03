import { IColumns } from "types.d";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getColumns } from "Services/coulmn";

interface initialStateTypes {
  column: IColumns[];
}
const initialState: initialStateTypes = {
  column: [],
};

export const fetchColumns = createAsyncThunk(
  "columns/fetchColumns",
  async (boardId: string) => {
    const { data } = await getColumns(boardId);
    return data;
  }
);

const columnSlices = createSlice({
  name: "coulmnSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state, action) => {})
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.column = action.payload;
      })
      .addCase(fetchColumns.rejected, (state, action) => {});
  },
});
export const { actions: columnActions, reducer: columnSlice } = columnSlices;
