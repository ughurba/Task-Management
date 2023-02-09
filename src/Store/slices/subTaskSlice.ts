import { ISubTask } from "types.d";
import { getSubTasks } from "Services/subTask";
import { Status } from "Helper/enums";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialStateTypes {
  subTasks: ISubTask[];
  status: Status;
}
const initialState: initialStateTypes = {
  subTasks: [],
  status: Status.loading,
};

export const fetchSubTasks = createAsyncThunk(
  "subTasksSlice/fetchSubTasks",
  async (taskId: number) => {
    const { data } = await getSubTasks(taskId);
    return data;
  }
);

const subTasksSlices = createSlice({
  name: "subTasksSlice",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubTasks.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(fetchSubTasks.fulfilled, (state, action) => {
        state.subTasks = action.payload;
        state.status = Status.success;
      })
      .addCase(fetchSubTasks.rejected, (state) => {
        state.status = Status.reject;
      });
  },
});
export const { actions: subTaskActions, reducer: subTaskSlice } =
  subTasksSlices;
