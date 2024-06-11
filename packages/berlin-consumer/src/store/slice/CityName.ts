import { createSlice } from '@reduxjs/toolkit';

const localCity = localStorage.getItem('city');

const intiState = {
  name: localCity ? localCity : 'Dubai',
  prevLocation: '',
};

const city = createSlice({
  name: 'cityName',
  initialState: intiState,
  reducers: {
    selectedCity(state, action) {
      state.name = action.payload;
      localStorage.setItem('city', state.name);
    },
    updatePrevPage(state, action) {
      state.prevLocation = action.payload;
    },
  },
});

export const { selectedCity, updatePrevPage } = city.actions;
export default city.reducer;
