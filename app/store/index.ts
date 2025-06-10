import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobsListSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
