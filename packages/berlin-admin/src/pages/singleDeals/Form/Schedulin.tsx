import { Button } from '@mui/material';
import { Grid, InputLabel, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

import {
  CustomSwitchButton,
  MagicDropDown,
  MagicDropDownWithId,
  NormalTextField,
} from 'berlin-common';
import { PreferredTime, disabledDay, hours, minute } from '../../../data/data';
import { FieldArray } from 'formik';
import { useEffect } from 'react';

const SchedulingAndLocation = ({
  isBulkAllocationDone,
  permission,
  formik,
  removeDealSlots,
  setRemoveDealSlots,
}: any) => {
  const params = useParams();
  const dealId: string = params.id ? params.id : '';

  const SlotArrayObj = {
    start_hour: null,
    start_minute: null,
    end_hour: null,
    end_minute: null,
  };
  const removeHandler = (index, arrayHelpers, item) => {
    if (item.id) {
      setRemoveDealSlots([...removeDealSlots, { remove: true, ...item }]);
    }
    arrayHelpers.remove(index);
  };
  useEffect(() => {
    if (formik.values.template_type?.label == 'Merchant') {
      formik.setFieldValue('is_slot_enabled', false);
    }
  }, [formik.values.template_type]);
  return (
    <>
      <Grid container spacing={3.5}>
        {/* <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Estimated Duration (Hours)</InputLabel>
            <NormalTextField
              name="est_duration_hours"
              placeholder="Enter Estimated Duration (Hours)"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Preferred Time</InputLabel>
            <MagicDropDown
              name="preferred_time_of_day"
              option={PreferredTime}
              label="Preferred Time"
              formik={formik}
              placeholder="Select Preferred Time"
            />
          </Stack>
        </Grid> */}
        <Grid item xs={12} sm={12}>
          <Stack spacing={1}>
            <CustomSwitchButton
              name="is_slot_enabled"
              formik={formik}
              label="Slot enabled"
              onChange={(e) => {
                if (e.target.checked) {
                  formik.setFieldValue('is_inventory_variable_pricing', false);
                  if (formik.values.deal_slots.length === 0) {
                    formik.setFieldValue('deal_slots', [SlotArrayObj]);
                  }
                }
              }}
              tooltipText={
                formik?.values?.cloneDeal?.id
                  ? ''
                  : isBulkAllocationDone &&
                    'Field is disabled due to bulk insertion completion.'
              }
              disabled={
                formik.values.template_type?.label == 'Merchant'
                  ? formik.values.template_type?.label == 'Merchant'
                  : formik?.values?.cloneDeal?.id
                  ? false
                  : isBulkAllocationDone
              }
            />
          </Stack>
        </Grid>
        {Boolean(formik.values.is_slot_enabled) && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Slot Allocation Days<span className="asterisk">*</span>
                </InputLabel>
                <NormalTextField
                  name="slot_allow_allocation_days_count"
                  placeholder="Enter Slot Allocation Days"
                  disabled={
                    formik?.values?.cloneDeal?.id ? false : isBulkAllocationDone
                  }
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Slot disabled day</InputLabel>
                <MagicDropDown
                  name="slot_disabled_days"
                  option={disabledDay}
                  label="Days for Slot"
                  multiple={true}
                  formik={formik}
                  placeholder="Days for Slot"
                  disabled={
                    formik?.values?.cloneDeal?.id ? false : isBulkAllocationDone
                  }
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldArray
                name="deal_slots"
                render={(arrayHelpers) => (
                  <div>
                    {formik.values.deal_slots?.map(
                      (name: any, index: number) => (
                        <div key={index}>
                          <Grid container spacing={3.5}>
                            <Grid item xs={6} sm={3}>
                              <Stack spacing={1}>
                                <InputLabel>
                                  Start hour
                                  <span className="asterisk">*</span>
                                </InputLabel>
                                <MagicDropDownWithId
                                  option={hours}
                                  label="Start hour"
                                  formik={formik}
                                  name={`deal_slots[${index}].start_hour`}
                                  formikName={
                                    formik.values.deal_slots[index].start_hour
                                  }
                                  error={
                                    formik.errors?.deal_slots &&
                                    formik.errors?.deal_slots[index]?.start_hour
                                  }
                                  touched={
                                    formik.touched?.deal_slots &&
                                    formik.touched?.deal_slots[index]
                                      ?.start_hour
                                  }
                                  placeholder="Start hour"
                                  disabled={
                                    formik?.values?.cloneDeal?.id
                                      ? false
                                      : isBulkAllocationDone && name?.id
                                  }
                                />
                              </Stack>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Stack spacing={1}>
                                <InputLabel>
                                  Start minute
                                  <span className="asterisk">*</span>
                                </InputLabel>
                                <MagicDropDownWithId
                                  formikName={
                                    formik.values.deal_slots[index].start_minute
                                  }
                                  error={
                                    formik.errors?.deal_slots &&
                                    formik.errors?.deal_slots[index]
                                      ?.start_minute
                                  }
                                  touched={
                                    formik.touched?.deal_slots &&
                                    formik.touched?.deal_slots[index]
                                      ?.start_minute
                                  }
                                  option={minute}
                                  label="Start minute"
                                  formik={formik}
                                  name={`deal_slots[${index}].start_minute`}
                                  placeholder="Start minute"
                                  disabled={
                                    formik?.values?.cloneDeal?.id
                                      ? false
                                      : isBulkAllocationDone && name?.id
                                  }
                                />
                              </Stack>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Stack spacing={1}>
                                <InputLabel>
                                  End hour<span className="asterisk">*</span>
                                </InputLabel>
                                <MagicDropDownWithId
                                  formikName={
                                    formik.values.deal_slots[index].end_hour
                                  }
                                  error={
                                    formik.errors?.deal_slots &&
                                    formik.errors?.deal_slots[index]?.end_hour
                                  }
                                  touched={
                                    formik.touched?.deal_slots &&
                                    formik.touched?.deal_slots[index]?.end_hour
                                  }
                                  option={hours}
                                  label="Start minute"
                                  formik={formik}
                                  name={`deal_slots[${index}].end_hour`}
                                  placeholder="End hour"
                                  disabled={
                                    formik?.values?.cloneDeal?.id
                                      ? false
                                      : isBulkAllocationDone && name?.id
                                  }
                                />
                              </Stack>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Stack spacing={1}>
                                <InputLabel>
                                  End minute<span className="asterisk">*</span>
                                </InputLabel>
                                <MagicDropDownWithId
                                  formikName={
                                    formik.values.deal_slots[index].end_minute
                                  }
                                  error={
                                    formik.errors?.deal_slots &&
                                    formik.errors?.deal_slots[index]?.end_minute
                                  }
                                  touched={
                                    formik.touched?.deal_slots &&
                                    formik.touched?.deal_slots[index]
                                      ?.end_minute
                                  }
                                  option={minute}
                                  label="Start minute"
                                  formik={formik}
                                  name={`deal_slots[${index}].end_minute`}
                                  placeholder="End minute"
                                  disabled={
                                    formik?.values?.cloneDeal?.id
                                      ? false
                                      : isBulkAllocationDone && name?.id
                                  }
                                />
                              </Stack>
                            </Grid>
                          </Grid>
                          {formik.values.deal_slots.length && (
                            <>
                              {formik.values.deal_slots.length === 1 ? (
                                ''
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  sx={{ mt: 1, mr: 1 }}
                                  onClick={() =>
                                    removeHandler(index, arrayHelpers, name)
                                  }
                                  disabled={
                                    formik?.values?.cloneDeal?.id
                                      ? false
                                      : (permission !== 'WRITE' &&
                                          permission !== 'FULL') ||
                                        (isBulkAllocationDone && name?.id)
                                  }
                                >
                                  REMOVE
                                </Button>
                              )}
                              <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mt: 1, mr: 1 }}
                                disabled={
                                  permission === 'WRITE' ||
                                  permission === 'FULL'
                                    ? false
                                    : true
                                }
                                onClick={() => arrayHelpers.push(SlotArrayObj)} // insert an empty string at a position
                              >
                                ADD
                              </Button>
                            </>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default SchedulingAndLocation;
