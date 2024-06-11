import { FormHelperText, TextFieldProps } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";
type MagicDatePickerType = {
  name: string;
  disablePast?: boolean;
  formik: any;
  className?: string;
  maxDate?: any;
  minDate?: any;
  disableFuture?: boolean;
} & TextFieldProps;

const MagicDatePicker = ({
  name,
  label,
  formik,
  disabled = false,
  disablePast = false,
  className,
  maxDate,
  minDate,
  disableFuture,
}: MagicDatePickerType) => {
  return (
    <ErrorBoundary>
      <label>{label}</label>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          disabled={Boolean(disabled)}
          className={`${className} ${
            formik.touched[name] && formik.errors[name] ? "dropdownError" : ""
          } `}
          value={formik.values[name] ? moment(formik.values[name]) : null}
          sx={{ width: "100%" }}
          onChange={(value) => formik.setFieldValue(name, value)}
          disablePast={disablePast}
          maxDate={maxDate}
          minDate={minDate}
          format="DD-MM-YYYY"
          disableFuture={disableFuture}
        />
      </LocalizationProvider>
      {formik.touched[name] && formik.errors[name] && (
        <FormHelperText
          sx={{ paddingLeft: 1.75 }}
          error
          id="helper-text-country"
        >
          {formik.errors[name]}
        </FormHelperText>
      )}
    </ErrorBoundary>
  );
};

export default MagicDatePicker;
