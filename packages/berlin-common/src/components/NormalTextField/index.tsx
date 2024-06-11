import React from "react";
import { FastField, getIn } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";

type MagicTextFieldType = {
  name: string;
  className?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  multiline?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & TextFieldProps;

const MagicTextField = React.memo(
  ({
    name,
    type,
    label,
    className,
    placeholder,
    multiline = false,
    rows = 1,
    onChange,
    ...props
  }: MagicTextFieldType) => {
    return (
      <ErrorBoundary>
        <FastField name={name}>
          {({ field, form }: any) => {
            const error = getIn(form.errors, name);
            const touched = getIn(form.touched, name);

            return (
              <div>
                <TextField
                  rows={rows}
                  multiline={multiline}
                  fullWidth
                  type={type}
                  {...field}
                  {...props}
                  disabled={props.disabled || false} // Ensure it's a boolean
                  value={field.value?.toString() || ""} // Use value to make it controlled
                  onChange={(e) => {
                    field.onChange(e);
                    if (onChange) {
                      onChange(e);
                    }
                  }} // Handle changes
                  className={className}
                  helperText={touched && error ? error : ""}
                  error={touched && error ? true : false}
                  placeholder={placeholder}
                  label={label}
                />
              </div>
            );
          }}
        </FastField>
      </ErrorBoundary>
    );
  }
);

export default MagicTextField;
