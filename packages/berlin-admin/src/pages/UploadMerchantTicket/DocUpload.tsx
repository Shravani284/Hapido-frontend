import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, CircularProgress } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import { FormHelperText, TextFieldProps } from '@mui/material';
// styles
const Input = styled('input')({
  display: 'none',
});
Input.displayName = 'Input';

type FileUploadType = {
  accept?: string;
  //   onSelect?: (files: fileType[]) => void;
  //   files?: fileType[];
  multiSelect?: boolean;
  type?: string;
  name: string;
  formik: any;
};

function DocUpload({
  accept = 'document',
  multiSelect = true,
  name,
  formik,
}: FileUploadType) {
  const [loading, _setLoading] = useState(false);

  return (
    <>
      <Box display={'flex'} gap={2}>
        <label>
          <Input
            accept={accept}
            multiple={multiSelect}
            type="file"
            name={name}
            onChange={(e) => formik.setFieldValue(name, e.target.files)}
          />

          <Button variant="contained" component="span" disabled={loading}>
            {loading ? (
              <CircularProgress
                color="secondary"
                style={{ marginRight: 5 }}
                size={15}
              />
            ) : (
              <CloudUploadOutlined style={{ marginRight: 5 }} />
            )}
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
          {formik.touched[name] && formik.errors[name] && (
            <FormHelperText
              sx={{ marginLeft: 1.75 }}
              error
              id="helper-text-country"
            >
              {formik.errors[name]}
            </FormHelperText>
          )}
        </label>
      </Box>
    </>
  );
}

export default DocUpload;
