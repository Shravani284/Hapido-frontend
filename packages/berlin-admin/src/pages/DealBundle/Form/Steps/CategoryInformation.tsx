import { InputLabel } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { GroupDropDown } from 'berlin-common';
import { Box } from '@mui/material';

const CategoryInformation = ({ formik, primaryCategory }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Primary Category<span className="asterisk">*</span>
            </InputLabel>
            <GroupDropDown
              name="primary_category_id"
              option={primaryCategory}
              label="Primary Category"
              formik={formik}
              placeholder="Select Primary Category"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Secondary Categories</InputLabel>
            <Box>
              <GroupDropDown
                name="secondary_category_ids"
                option={primaryCategory}
                label="Secondary Category"
                formik={formik}
                placeholder="Select Secondary Category"
                multiple
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryInformation;
