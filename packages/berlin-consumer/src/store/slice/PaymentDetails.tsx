import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  item: object;
};

const initState: initStateType = {
  item: {},
};

const productDetails = createSlice({
  name: 'Loader',
  initialState: initState,
  reducers: {
    setDetails(state, action) {
      state.item = action.payload;
    },
  },
});

export const { setDetails } = productDetails.actions;
export default productDetails.reducer;
