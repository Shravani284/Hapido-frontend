import { FormHelperText, TextFieldProps } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
type MagicDatePickerType = {
  name: string;
  disablePast?: boolean;
  formik: any;
  className?: string;
  maxDate?: any;
  minDate?: any;
} & TextFieldProps;

const MagicDateAndTimePicker = ({
  name,
  label,
  formik,
  disabled = false,
  disablePast = false,
  className,
  maxDate,
  minDate,
}: MagicDatePickerType) => {
  return (
    <ErrorBoundary>
      <label>{label}</label>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDateTimePicker
          disabled={Boolean(disabled)}
          className={`${className} ${
            formik.touched[name] && formik.errors[name] ? "dropdownError" : ""
          } `}
          value={formik.values[name] ? moment.utc(formik.values[name]) : null}
          sx={{ width: "100%" }}
          // onChange={(value) => formik.setFieldValue(name, value)}
          disablePast={disablePast}
          maxDate={maxDate}
          minDate={minDate}
          // format="DD-MM-YYYY"
          onAccept={(value) => formik.setFieldValue(name, value)}
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

export default MagicDateAndTimePicker;
