import { InputLabel } from '@mui/material';
import { Grid, Stack } from '@mui/material';
import { CustomSwitchButton, NormalTextField } from 'berlin-common';
import { useParams } from 'react-router-dom';

const PromotionAndVisibility = ({ formik }: any) => {
  const params = useParams();
  const dealId: string = params.id ? params.id : '';
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Priority<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="priority" placeholder="Enter Priority" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Group Priority</InputLabel>
            <NormalTextField
              name="group_priority"
              placeholder="Enter Group Priority"
            />
          </Stack>
        </Grid>
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
          <InputLabel>Show in Home Category Widget</InputLabel>
          <CustomSwitchButton
            name="is_home_widget_deal"
            formik={formik}
            label=""
          />
        </Grid>
        {Boolean(formik.values.is_home_widget_deal) === true && (
          <Grid item xs={12} sm={6}>
            <InputLabel>
              Home widget priority <span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name={`home_widget_priority`}
              placeholder="Home widget priority"
            />
          </Grid>
        )}
        {/* <Grid item xs={12} sm={6}>
          <InputLabel>content manager email triggered</InputLabel>

          <CustomSwitchButton
            name="content_manager_email_triggered"
            formik={formik}
            label=""
            disabled={true}
          />
        </Grid> */}
      </Grid>
    </>
  );
};

export default PromotionAndVisibility;
