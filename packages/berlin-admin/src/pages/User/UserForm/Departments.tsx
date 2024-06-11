import { Button, InputLabel, Box } from '@mui/material';
import { Grid, Stack } from '@mui/material';
import { MagicDropDownWithId } from 'berlin-common';
import { FieldArray } from 'formik';
import { userDesignation } from '../../../data/data';
import { removeUserDepartMent } from '../../../services/userService';

const Departments = ({ formik, roleList, permission }: any) => {
  const obj = { departmentId: '', designation: '' };

  // Remove
  const removeModule = (i: any, arrayHelpers, name) => {
    if (name.id) {
      const payload = {
        id: name.id,
        user_id: name.user_id,
      };
      removeUserDepartMent(payload)
        .then((respone) => {
          arrayHelpers.remove(i);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      arrayHelpers.remove(i);
    }
  };
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={12}>
          <FieldArray
            name="departments"
            render={(arrayHelpers) => (
              <div>
                {formik?.values?.departments?.map(
                  (name: any, index: number) => (
                    <div key={index}>
                      <Grid container spacing={3.5}>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Department<span className="asterisk">*</span>
                            </InputLabel>
                            <MagicDropDownWithId
                              // disabled={disable}
                              name={`departments[${index}].departmentId`}
                              option={roleList}
                              label="departments"
                              formik={formik}
                              placeholder="Departments"
                              formikName={
                                formik.values.departments[index].departmentId
                              }
                              error={
                                formik?.errors?.departments
                                  ? formik?.errors?.departments[index]
                                      ?.departmentId
                                  : ''
                              }
                              touched={
                                formik?.touched?.departments
                                  ? formik?.touched?.departments[index]
                                      ?.departmentId
                                  : false
                              }
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Stack spacing={1}>
                            <InputLabel>
                              Designation<span className="asterisk">*</span>
                            </InputLabel>
                            <MagicDropDownWithId
                              // disabled={disable}
                              name={`departments[${index}].designation`}
                              option={userDesignation}
                              label="designation"
                              formik={formik}
                              placeholder="Designation"
                              formikName={
                                formik.values.departments[index].designation
                              }
                              error={
                                formik?.errors?.departments
                                  ? formik?.errors?.departments[index]
                                      ?.designation
                                  : ''
                              }
                              touched={
                                formik?.touched?.departments
                                  ? formik?.touched?.departments[index]
                                      ?.designation
                                  : false
                              }
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                      <Box mt={2} mb={2}>
                        {formik.values.departments.length > 0 && (
                          <>
                            {formik.values.departments.length === 1 ? (
                              ''
                            ) : (
                              <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mr: 1 }}
                                disabled={
                                  // disable
                                  //   ? disable :
                                  permission === 'WRITE' ||
                                  permission === 'FULL'
                                    ? false
                                    : true
                                }
                                onClick={() =>
                                  removeModule(index, arrayHelpers, name)
                                }
                              >
                                REMOVE
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              color="secondary"
                              disabled={
                                // disable
                                //   ? disable :
                                permission === 'WRITE' || permission === 'FULL'
                                  ? false
                                  : true
                              }
                              sx={{ mr: 1 }}
                              onClick={() => arrayHelpers.push(obj)}
                            >
                              ADD
                            </Button>
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

export default Departments;
