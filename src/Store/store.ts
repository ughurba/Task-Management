import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { columnSlice } from "./slices/columnSlice";
import { boardSlice } from "./slices/boardSlice";
import { userSlice } from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    columns: columnSlice,
    boards: boardSlice,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
