import { Field } from 'formik';
import { Checkbox, FormControlLabel, TextFieldProps } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

type checkBoxType = {
  name: string;
  className?: string;
} & TextFieldProps;

const CheckBoxField = ({ name, label }: checkBoxType) => {
  return (
    <div>
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          meta,
        }: any) => (
          <div>
            <FormControlLabel
              control={<Checkbox color='default' size='small' />}
              label={label}
              {...field}
              checked={field.value}
            />
            <FormHelperText>
              {meta.touched && meta.error ? meta.error : null}
            </FormHelperText>
          </div>
        )}
      </Field>
    </div>
  );
};

export default CheckBoxField;
