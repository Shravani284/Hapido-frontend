import { createSlice } from '@reduxjs/toolkit';


const intiState = {
  isOpen: false,
  isClickedBookNow: false,
};

const Slider = createSlice({
  name: 'SliderName',
  initialState: intiState,
  reducers: {
    toggleDrawer(state, action) {
      state.isOpen = action.payload;
    },
    scrollBookNow(state, action) {
      state.isClickedBookNow = action.payload;
    }
  },
});

export const { toggleDrawer, scrollBookNow } = Slider.actions;
export default Slider.reducer;
