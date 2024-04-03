// videoSlice.ts
import { heroVideo, smallHeroVideo } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';


interface VideoState {
  videoSource: string; // Assuming videoSource is a string
}

const initialState: VideoState = {
  videoSource: "", // Initialize with an empty string or any default value
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateVideoSource: (state, action) => {
      state.videoSource = action.payload;
    },
  },
});

export const { updateVideoSource } = videoSlice.actions;

export const selectVideoSource = (state: RootState) => state.video.videoSource;

export default videoSlice.reducer;