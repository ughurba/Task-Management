import { Status } from "./../../Helper/enums";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBoard } from "Services/board";
import { IGetAllBoardDto } from "Dtos/boardDtos";

interface initialStateTypes {
  board: IGetAllBoardDto[];
  status: Status;
}
const initialState: initialStateTypes = {
  board: [],
  status: Status.loading,
};

export const fetchBoards = createAsyncThunk("board/fetchBoards", async () => {
  const { data } = await getAllBoard();
  return data;
});

const boardSlices = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.board = action.payload;
        state.status = Status.success;
      })
      .addCase(fetchBoards.rejected, (state) => {
        state.status = Status.reject;
      });
  },
});
export const { actions: boardActions, reducer: boardSlice } = boardSlices;
