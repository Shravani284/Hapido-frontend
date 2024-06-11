import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  filterDetails?: {};
};

const initState: initStateType = {
  filterDetails: null,
};

const fliterSlice = createSlice({
  name: 'Filter',
  initialState: initState,
  reducers: {
    filterRememberValueHandler(state, action) {
      state.filterDetails = action.payload;
    },
    filterRemoveHandler(state, action) {
      state.filterDetails = action.payload;
    },
  },
});

export const { filterRememberValueHandler, filterRemoveHandler } =
  fliterSlice.actions;
export default fliterSlice.reducer;
