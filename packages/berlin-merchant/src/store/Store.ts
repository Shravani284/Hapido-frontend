import { configureStore } from '@reduxjs/toolkit';
import Login from './slice/LoginSlice';
import Loader from './slice/Loader';
import Menu from './menu/menu';

const Store = configureStore({
  reducer: {
    login: Login,
    loader: Loader,
    menu: Menu,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
export type RootState = ReturnType<typeof configureStore>;
