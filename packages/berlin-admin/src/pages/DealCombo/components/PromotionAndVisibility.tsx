import { InputLabel } from '@mui/material';
import { Grid, Stack } from '@mui/material';
import { CustomSwitchButton, NormalTextField } from 'berlin-common';

const PromotionAndVisibility = ({ formik }: any) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <InputLabel>Show Timer</InputLabel>
          <CustomSwitchButton name="show_timer" formik={formik} label="" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel>Show in Featured List</InputLabel>
          <CustomSwitchButton name="is_featured" formik={formik} label="" />
        </Grid>
        {Boolean(formik.values.is_featured) === true && (
          <Grid item xs={12} sm={6}>
            <InputLabel>
              Feature widget priority<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name={`feature_widget_priority`}
              placeholder="Feature widget priority"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <InputLabel>Sold Out</InputLabel>
          <CustomSwitchButton name="sold_out" formik={formik} label="" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal Combo Priority<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="priority" placeholder="Enter Priority" />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default PromotionAndVisibility;
