import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBoard } from "Services/board";
import { IGetAllBoardDto } from "Dtos/boardDtos";

interface initialStateTypes {
  board: IGetAllBoardDto[];
}
const initialState: initialStateTypes = {
  board: [],
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
      .addCase(fetchBoards.pending, (state, action) => {})
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.board = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {});
  },
});
export const { actions: boardActions, reducer: boardSlice } = boardSlices;
