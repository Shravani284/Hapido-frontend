import { ApiRequest } from 'berlin-common';
import { string } from 'yup';

const URL = {
  LOGIN: '/api/v1/users/auth/login',
  REGISTER: '/api/v1/users/auth/register?mode=Web',
  OTPVERIFY: '/api/v1/users/auth/verify/otp?mode=Web',
  RESENDOTP: '/api/v1/users/auth/resend/otp?mode=Web',
  RESETOTP: '/api/v1/users/auth/reset/password?mode=Web',
  PASSWORD: '/api/v1/users/auth/compare/password',
  FORGOTPASSWORD: '/api/v1/users/auth/forgot/password?mode=Web',
  GOOGLELOGIN: '/api/v1/users/auth/google/signin?mode=Mobile',
  APPLELOGIN: '/api/v1/users/auth/apple/signin?mode=Mobile',
};

export const login = async (payLoad: { email: string }) => {
  try {
    const response = await ApiRequest.post(URL.LOGIN, payLoad);
    return response.data; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

// Register

interface RegisterType {
  email?: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const Register = async (payLoad: RegisterType) => {
  try {
    const response = await ApiRequest.post(URL.REGISTER, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface OtpVerifyType {
  email: string;
  attempt: number | string;
}

export const OtpVerify = async (payLoad: OtpVerifyType, page: string) => {
  try {
    const response = await ApiRequest.post(
      `${URL.OTPVERIFY}&for=${page}`,
      payLoad
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface resendOtpType {
  email: string;
}

export const resendOtp = async (payLoad: resendOtpType) => {
  try {
    const response = await ApiRequest.post(URL.RESENDOTP, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface resetOtpType {
  email: string;
  newPassword: string;
}

export const resetOtp = async (payLoad: resetOtpType) => {
  try {
    const response = await ApiRequest.post(URL.RESETOTP, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};
interface PassWordType {
  email: string;
  password: string;
}

export const PassWord = async (payLoad: PassWordType) => {
  try {
    const response = await ApiRequest.post(URL.PASSWORD, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface ForgotPass {
  email: string;
}

export const ForgotPAssWord = async (payLoad: ForgotPass) => {
  try {
    const response = await ApiRequest.post(URL.FORGOTPASSWORD, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface GoogleLoginType {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  prompt: string;
}
interface AppleLoginType {
  code: string;
  id_token: string;
  state: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const LoginWithGoogle = async (payLoad: GoogleLoginType) => {
  try {
    const response = await ApiRequest.post(URL.GOOGLELOGIN, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LoginWithApple = async (payLoad: AppleLoginType) => {
  try {
    const response = await ApiRequest.post(URL.APPLELOGIN, payLoad);
    return response.data;
  } catch (error) {
    throw error;
  }
};
