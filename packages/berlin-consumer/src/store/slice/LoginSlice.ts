import { googleLogout } from '@react-oauth/google';
import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  loginDetails: {};
  token: string | null;
  addresses: [];
  isLoginPopupOpen: boolean;
};

const getLocalToken = localStorage.getItem('loginDetails');
localStorage.getItem('loginDetails');

let tokenData = null;
if (getLocalToken) {
  tokenData = JSON.parse(getLocalToken);
}
const initState: initStateType = {
  loginDetails: tokenData ? tokenData : {},
  token: tokenData ? tokenData.token : '',
  addresses: tokenData?.addresses || [],
  isLoginPopupOpen: false,
};

const loginSlice = createSlice({
  name: 'Login',
  initialState: initState,
  reducers: {
    logoutHandler(state) {
      localStorage.removeItem('loginDetails');
      localStorage.removeItem('token');
      localStorage.removeItem('addresses');
      localStorage.removeItem('mobileNumber');
      state.token = null;
      googleLogout();
    },
    logInHandler(state, action) {
      localStorage.setItem('loginDetails', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem(
        'mobileNumber',
        JSON.stringify(
          `${action.payload.countrycodemobile}${action.payload.mobile_number}`
        )
      );
      localStorage.setItem(
        'addresses',
        JSON.stringify(action.payload.addresses)
      );

      state.isLoginPopupOpen = false;
      state.token = action.payload.token;
      state.loginDetails = action.payload;
      state.addresses = action.payload.addresses;
    },

    loginPopupChange(state) {
      state.isLoginPopupOpen = true;
    },
    loginPopupChangeOut(state) {
      state.isLoginPopupOpen = false;
    },
  },
});

export const {
  logoutHandler,
  logInHandler,
  loginPopupChange,
  loginPopupChangeOut,
} = loginSlice.actions;
export default loginSlice.reducer;
