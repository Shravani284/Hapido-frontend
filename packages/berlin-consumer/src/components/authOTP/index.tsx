import React from 'react';
import { Field, FormikProps } from 'formik';
import { TextFieldProps } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import errorIcon from '../../../assets/error.svg';
import Box from '@mui/material/Box';

type OTPType = {
  name: string;
  formik: any;
} & TextFieldProps;

const OTP = ({ name, label, formik }: OTPType) => {
  const handleChange = (newValue: any) => {
    const uppercaseText = newValue
      .toUpperCase()
      .replace(/\s/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
    formik.setFieldValue(name, uppercaseText);
  };

  return (
    <Box
      className={
        formik.touched[name] && formik.errors[name] ? 'Otperror' : 'otpWrapper'
      }
    >
      <Box display="flex" alignItems="center">
        <div>
          <label>{label}</label>
          <MuiOtpInput value={formik.values[name]} onChange={handleChange} />
        </div>
        {formik.touched[name] && formik.errors[name] ? (
          <img
            loading="lazy"
            src={errorIcon}
            alt="ErrorIcon"
            className="errorIcon"
          />
        ) : null}
      </Box>
      <p>
        {formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : null}
      </p>
    </Box>
  );
};

export default OTP;
