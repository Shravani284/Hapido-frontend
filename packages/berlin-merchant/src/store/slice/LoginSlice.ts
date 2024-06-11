import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  loginDetails: {};
  token: string | null;
};

const getLocalToken = localStorage.getItem('loginDetails');
let tokenData = null;
if (getLocalToken) {
  tokenData = JSON.parse(getLocalToken);
}
const initState: initStateType = {
  loginDetails: tokenData ? tokenData : {},
  token: tokenData ? tokenData.token : '',
};

const loginSlice = createSlice({
  name: 'Login',
  initialState: initState,
  reducers: {
    logoutHandler(state) {
      localStorage.removeItem('loginDetails');
      state.token = null;
    },
    logInHandler(state, action) {
      localStorage.setItem('loginDetails', JSON.stringify(action.payload));
        localStorage.setItem('token', JSON.stringify(action.payload.token));
      state.token = action.payload.token;
      state.loginDetails = action.payload;
    },
  },
});

export const { logoutHandler, logInHandler } = loginSlice.actions;
export default loginSlice.reducer;
