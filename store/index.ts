// store.ts
import { configureStore } from '@reduxjs/toolkit';
import videoReducer from "./slice/videoSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
    // Add other reducers if needed
  },
});
export type RootState = ReturnType <typeof store.getState>
export type AppDisPatch = typeof store.dispatch;
export default store;