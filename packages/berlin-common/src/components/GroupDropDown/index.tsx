import {
  Autocomplete,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";

type GroupDropDownType = {
  name: string;
  className?: string;
  option: { label: string; id: string | number }[];
  placeholder?: string;
  formik: any;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (data) => void;
} & TextFieldProps;

const GroupDropDown = ({
  name,
  option,
  label,
  formik,
  className,
  placeholder,
  multiple = false,
  disabled = false,
  onChange,
}: GroupDropDownType) => {
  return (
    <ErrorBoundary>
      <Autocomplete
        multiple={multiple}
        disabled={Boolean(disabled)}
        options={option}
        className={`${className} ${
          formik.touched[name] && formik.errors[name] ? "dropdownError" : ""
        } `}
        getOptionLabel={(option) => (option.label ? option.label : "")}
        value={formik.values[name]}
        onChange={(e, value) => {
          formik.setFieldValue(name, value);
          onChange && onChange(value);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        renderOption={(params, option) => (
          <li
            style={{
              marginLeft: option?.subcategory ? 10 : 0,
              fontWeight: option?.subcategory ? 300 : 600,
            }}
            {...params}
            key={option.id}
          >
            {option.label}
          </li>
        )}
      />
      {formik.touched[name] && formik.errors[name] && (
        <FormHelperText error id="helper-text-country">
          {formik.errors[name]}
        </FormHelperText>
      )}
    </ErrorBoundary>
  );
};

export default GroupDropDown;
