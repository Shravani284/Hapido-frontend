import { createSlice } from '@reduxjs/toolkit';

type initStateType = {
  loginDetails: {};
  token: string | null;
  roles: { access: string, module: string, id: number }[]
};

const getLocalToken = localStorage.getItem('loginDetails');
let tokenData = null;
if (getLocalToken) {
  tokenData = JSON.parse(getLocalToken);
}
const initState: initStateType = {
  loginDetails: tokenData ? tokenData : {},
  token: tokenData ? tokenData.token : '',
  roles: tokenData ? tokenData.roles : [],
};

const loginSlice = createSlice({
  name: 'Login',
  initialState: initState,
  reducers: {
    logoutHandler(state) {
      localStorage.removeItem('loginDetails');
      localStorage.removeItem('token');
      localStorage.removeItem("roles")
      state.token = null;
    },
    logInHandler(state, action) {
      localStorage.setItem('loginDetails', JSON.stringify(action.payload));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('roles', JSON.stringify(action.payload.roles));

      state.token = action.payload.token;
      state.loginDetails = action.payload;
      state.roles = action.payload.roles;

    },
  },
});

export const { logoutHandler, logInHandler } = loginSlice.actions;
export default loginSlice.reducer;
