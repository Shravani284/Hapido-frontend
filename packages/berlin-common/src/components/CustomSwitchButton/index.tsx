import * as React from 'react';
import {
  FormControlLabel,
  FormHelperText,
  Switch,
  Tooltip,
} from '@mui/material';

type CustomSwitchButtonType = {
  name: string;
  formik: any;
  label: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: any;
  tooltipText?: string;
};

const CustomSwitchButton = ({
  name,
  formik,
  label,
  disabled,
  checked,
  onChange,
  tooltipText,
}: CustomSwitchButtonType) => {
  return (
    <div>
      <div>
        <Tooltip title={tooltipText} placement='top' arrow>
          {/* Wrap the FormControlLabel in Tooltip */}
          <FormControlLabel
            checked={
              checked === true
                ? true
                : false || Boolean(formik.values[name]) === true
                ? true
                : false
            }
            control={<Switch color='primary' />}
            label={label}
            labelPlacement='end'
            sx={{ ml: 1 }}
            disabled={Boolean(disabled)}
            onChange={(e: any) => {
              formik.setFieldValue(name, e.target.checked);
              if (onChange) {
                onChange(e);
              }
            }}
          />
        </Tooltip>
        {formik.touched[name] && formik.errors[name] && (
          <FormHelperText error id='helper-text-country'>
            {formik.errors[name]}
          </FormHelperText>
        )}
      </div>
    </div>
  );
};

export default CustomSwitchButton;
