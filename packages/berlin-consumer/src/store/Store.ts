import { configureStore } from '@reduxjs/toolkit';
import Login from './slice/LoginSlice';
import Loader from './slice/Loader';
import CityName from './slice/CityName';
import SliderSlice from './slice/SliderSlice';
import CartCount from './slice/CartCount';
import productDetails from './slice/PaymentDetails'

const Store = configureStore({
  reducer: {
    login: Login,
    loader: Loader,
    cityName: CityName,
    Slider: SliderSlice,
    cartItems: CartCount,
    productDetails: productDetails,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
export type RootState = ReturnType<typeof configureStore>;
