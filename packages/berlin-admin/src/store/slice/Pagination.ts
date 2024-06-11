import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  page?: number;
  rowsPerPage?: number;
};

const initState: initStateType = {
  page: 0,
  rowsPerPage: 10,
};

const paginationSlice = createSlice({
  name: 'Pagination',
  initialState: initState,
  reducers: {
    pageHandler(state, action) {
      state.page = action?.payload;
    },
    rowPageHandler(state, action) {
      state.rowsPerPage = action?.payload;
    },
    pageRemoveValueHandler(state, action) {
      state.page = action?.payload;
    },
    rowPageRemoveValueHandler(state, action) {
      state.rowsPerPage = action?.payload;
    },
  },
});

export const {
  pageHandler,
  rowPageHandler,
  pageRemoveValueHandler,
  rowPageRemoveValueHandler,
} = paginationSlice.actions;
export default paginationSlice.reducer;
