import {
  Autocomplete,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import ErrorBoundary from "../ErrorBoundery/ErrorBoundary";

type MagicDropDownType = {
  name: string;
  className?: string;
  option: { label: string; id: string | number }[];
  placeholder?: string;
  formik: any;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: any;
  disabledOption?: string[];
} & TextFieldProps;

const MagicDropDown = ({
  name,
  option,
  label,
  formik,
  className,
  placeholder,
  multiple = false,
  disabled = false,
  onChange,
  disabledOption,
}: MagicDropDownType) => {
  const divStyle = {
    backgroundColor: "lightblue",
    // padding: '20px',
    borderColor: "red",
  };
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
        className={`${className} ${
          formik.touched[name] && formik.errors[name] ? "dropdownError" : ""
        } `}
        getOptionLabel={(option) => (option.label ? option.label : "")}
        value={formik.values[name]}
        // @ts-ignore
        onChange={(e, value) => {
          formik.setFieldValue(name, value);
          onChange && onChange(value);
        }}
        isOptionEqualToValue={(option, value) =>
          option?.label == value?.label && option?.id == value?.id
        }
        // isOptionEqualToValue={(option, value) =>
        //   option?.label == value?.label && option?.id == value?.id
        // }
        getOptionDisabled={getOptionDisabled}
        onBlur={formik.handleBlur}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} />
        )}
      />
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

export default MagicDropDown;
