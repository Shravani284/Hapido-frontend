import React from "react";
import { Field } from "formik";
import { TextFieldProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";

type MagicPasswordType = {
  name: string;
  className?: string;
  placeholder?: string;
} & TextFieldProps;

const MagicPassword = ({
  name,
  label,
  className,
  placeholder,
}: MagicPasswordType) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <ErrorBoundary>
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          meta,
        }: any) => (
          <div className="passFelid">
            <label>{label}</label>
            <OutlinedInput
              fullWidth
              className={className}
              {...field}
              placeholder={placeholder}
              name={name}
              type={!showPassword ? "password" : "text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              // helperText={meta.touched && meta.error ? meta.error : ""}
              error={meta.touched && meta.error}
            />
            <FormHelperText className="error">
              {meta.touched && meta.error ? meta.error : ""}{" "}
            </FormHelperText>
          </div>
        )}
      </Field>
    </ErrorBoundary>
  );
};

export default MagicPassword;
