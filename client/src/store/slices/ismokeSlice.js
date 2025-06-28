// Redux slice for offline/mock mode (no DB connection)
import { createSlice } from '@reduxjs/toolkit';

const ismokeSlice = createSlice({
  name: 'ismoke',
  initialState: false,
  reducers: {
    setIsmoke: (state, action) => action.payload,
  },
});

export const { setIsmoke } = ismokeSlice.actions;
export const ismoke = (state) => state.ismoke;
export default ismokeSlice.reducer;
