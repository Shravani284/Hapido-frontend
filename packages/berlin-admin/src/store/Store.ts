import { configureStore } from '@reduxjs/toolkit';
import Login from './slice/LoginSlice';
import Loader from './slice/Loader';
import Menu from './menu/menu';
import Pagination from './slice/Pagination';
import Filter from './slice/Filter';

const Store = configureStore({
  reducer: {
    login: Login,
    loader: Loader,
    menu: Menu,
    filter: Filter,
    pagination: Pagination,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;
export type RootState = ReturnType<typeof configureStore>;
