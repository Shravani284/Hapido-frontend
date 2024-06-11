import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiRequest } from 'berlin-common';
import { localeLang } from '../../utils/getLang';

const fetchData: any = createAsyncThunk(
  'cartItems',
  async ({ page, limit }: any) => {
    let url = `/api/v1/consumer/cart/getallcartitems?lang=${localeLang}`;
    if (page && limit) {
      url += `&page=${page}&limit=${limit}`;
    }
    const response = await ApiRequest.get(url);
    return response.data;
  }
);

const intiState = {
  cartRes: {},
  totalCartCount: 0,
  cartItems: [],
  cartUpdate: false,
  loading: false,
};

const cartItems = createSlice({
  name: 'cartItems',
  initialState: intiState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.cartRes = action.payload.data;
        state.totalCartCount = action.payload.data.totalCount;
        state.cartItems = action.payload.data.userCart;
        state.cartUpdate = action.payload.data.cartUpdate;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// export const { setCart } = cartItems.actions;
export default cartItems.reducer;
export { fetchData };
