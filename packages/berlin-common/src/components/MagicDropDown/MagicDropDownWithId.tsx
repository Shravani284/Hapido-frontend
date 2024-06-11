import {
  Autocomplete,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";

type MagicDropDownIdType = {
  name: string;
  className?: string;
  option: { label: string; id: string | number }[];
  placeholder?: string;
  formik: any;
  multiple?: boolean;
  disabled?: boolean;
  formikName: string;
  idName?: string;
  error?: any;
  touched?: boolean;
  disabledOption?: string[];
} & TextFieldProps;

const MagicDropDownWithId = ({
  name,
  option,
  label,
  formik,
  className,
  placeholder,
  multiple = false,
  disabled = false,
  formikName,
  idName,
  error,
  touched,
  disabledOption,
}: MagicDropDownIdType) => {
  const [value, setValue] = useState<any>(null);
  // console.log("value", value);
  // console.log("name", name);

  useEffect(() => {
    if (formikName !== undefined) {
      let selectedOption;
      if (idName) {
        selectedOption = option.find((e: any) => e[idName] === formikName);
      } else {
        selectedOption = option?.find((e: any) => e.id === formikName);
      }
      if (selectedOption) {
        setValue(selectedOption);
      }
    }
  }, [formikName, option]);

  const getOptionDisabled = (option) => {
    if (disabledOption?.length <= 0) return;
    // Check if the option's ID exists in the disabledIds array
    return disabledOption?.includes(option.id);
  };

  return (
    <ErrorBoundary>
      <Autocomplete
        multiple={multiple}
        disabled={Boolean(disabled)}
        options={option}
        className={`${className} ${touched && error ? "dropdownError" : ""} `}
        getOptionLabel={(option) => (option.label ? option.label : "")}
        value={value}
        disableClearable
        onChange={(e, value: any) =>
          formik.setFieldValue(name, idName ? value[idName] : value.id)
        }
        getOptionDisabled={getOptionDisabled}
        // isOptionEqualToValue={(option, value) =>
        //   option.label === value.label && option.id === value.id
        // }
        onBlur={formik.handleBlur}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
      {touched && error && (
        <FormHelperText
          sx={{ paddingLeft: 1.75 }}
          error
          id="helper-text-country"
        >
          {formik.errors[name]}
          {error}
        </FormHelperText>
      )}
    </ErrorBoundary>
  );
};

export default MagicDropDownWithId;
