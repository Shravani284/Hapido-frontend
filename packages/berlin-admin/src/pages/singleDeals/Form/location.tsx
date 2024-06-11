import { Button } from '@mui/material';
import { Grid, InputLabel, Stack, Box } from '@mui/material';
import { CustomSwitchButton, MagicDropDownWithId } from 'berlin-common';
import { FieldArray } from 'formik';
import { useEffect, useMemo } from 'react';

const Location = ({
  formik,
  areaList,
  permission,
  removeLocationSpecific,
  setRemoveLocationSpecific,
}: any) => {
  const fieldArrayObj = {
    area_id: '',
    coordinates: '',
  };

  const disabledDeal = useMemo(() => {
    return formik.values.location_specific.map((e) => e.area_id);
  }, [formik.values.location_specific]);

  const removeHandler = (index, arrayHelpers, item) => {
    if (item.id) {
      setRemoveLocationSpecific([
        ...removeLocationSpecific,
        { remove: true, ...item },
      ]);
    }
    arrayHelpers.remove(index);
  };
  useEffect(() => {
    if (formik.values.template_type?.label == 'Merchant') {
      formik.setFieldValue('is_location_specific', false);
    }
  }, [formik.values.template_type]);
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <InputLabel>Location Specific</InputLabel>
          <CustomSwitchButton
            name="is_location_specific"
            formik={formik}
            label=""
            disabled={formik.values.template_type?.label == 'Merchant'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FieldArray
            name="location_specific"
            render={(arrayHelpers) => (
              <div>
                {formik.values.location_specific?.map(
                  (name: string, index: number) => (
                    <div key={index}>
                      <Grid container spacing={3.5}>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Select Area<span className="asterisk">*</span>
                            </InputLabel>
                            <MagicDropDownWithId
                              name={`location_specific[${index}].area_id`}
                              option={areaList}
                              label="Slot area"
                              formik={formik}
                              placeholder="Select area"
                              // idName="area_id"
                              disabledOption={disabledDeal}
                              formikName={
                                formik?.values?.location_specific[index].area_id
                              }
                              error={
                                formik?.errors?.location_specific
                                  ? formik?.errors?.location_specific[index]
                                      ?.area_id
                                  : ''
                              }
                              touched={
                                formik?.touched?.location_specific
                                  ? formik?.touched?.location_specific[index]
                                  : false
                              }
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                      <Box mt={2} mb={2}>
                        {formik.values.location_specific.length > 0 && (
                          <>
                            {formik.values.location_specific.length === 1 ? (
                              ''
                            ) : (
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
                                onClick={() =>
                                  removeHandler(index, arrayHelpers, name)
                                }
                              >
                                REMOVE
                              </Button>
                            )}
                            {formik.values.location_specific.length - 1 ===
                              index && (
                              <Button
                                variant="outlined"
                                color="secondary"
                                disabled={
                                  permission === 'WRITE' ||
                                  permission === 'FULL'
                                    ? false
                                    : true
                                }
                                sx={{ mt: 1, mr: 1 }}
                                onClick={() => arrayHelpers.push(fieldArrayObj)} // insert an empty string at a position
                              >
                                ADD
                              </Button>
                            )}
                          </>
                        )}
                      </Box>
                    </div>
                  )
                )}
              </div>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Location;
