import { Field } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";

type MagicTextFieldType = {
  name: string;
  className?: string;
  placeholder?: string;
} & TextFieldProps;

const MagicTextField = ({
  name,
  type,
  label,
  className,
  placeholder,
  disabled = false,
}: MagicTextFieldType) => {
  return (
    <ErrorBoundary>
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          meta,
        }: any) => (
          <div>
            <label>{label}</label>
            <TextField
              disabled={disabled}
              fullWidth
              type={type}
              {...field}
              className={className}
              helperText={meta.touched && meta.error ? meta.error : ""}
              error={meta.touched && meta.error}
              placeholder={placeholder}
            />
          </div>
        )}
      </Field>
    </ErrorBoundary>
  );
};

export default MagicTextField;
