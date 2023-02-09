import { Status } from "./../../Helper/enums";
import { IColumns } from "types.d";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getColumns } from "Services/coulmn";

interface initialStateTypes {
  column: IColumns[];
  status: Status;
}
const initialState: initialStateTypes = {
  column: [],
  status: Status.loading,
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
  reducers: {
    updateSubTask: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.column = action.payload;
        state.status = Status.success;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.status = Status.reject;
      });
  },
});
export const { actions: columnActions, reducer: columnSlice } = columnSlices;
