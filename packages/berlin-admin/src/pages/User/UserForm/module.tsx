import { Button, InputLabel, Box } from '@mui/material';
import { Grid, Stack } from '@mui/material';
import { MagicDropDownWithId } from 'berlin-common';
import { FieldArray } from 'formik';
import { userAccess } from '../../../data/data';
import { removeUserModule } from '../../../services/userService';

const Module = ({ formik, roleList, permission, disable }: any) => {
  const obj = { module_id: '', access: '' };

  // Remove
  const removeModule = (i: any, arrayHelpers, name) => {
    if (name.id) {
      const payload = {
        id: name.id,
        user_id: name.user_id,
      };
      removeUserModule(payload)
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
            name="roles"
            render={(arrayHelpers) => (
              <div>
                {formik?.values?.roles?.map((name: any, index: number) => (
                  <div key={index}>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>
                            Module<span className="asterisk">*</span>
                          </InputLabel>
                          <MagicDropDownWithId
                            // disabled={disable}
                            name={`roles[${index}].module_id`}
                            option={roleList}
                            label="Module"
                            formik={formik}
                            placeholder="Module"
                            formikName={formik.values.roles[index].module_id}
                            error={
                              formik?.errors?.roles
                                ? formik?.errors?.roles[index]?.module_id
                                : ''
                            }
                            touched={
                              formik?.touched?.roles
                                ? formik?.touched?.roles[index]?.module_id
                                : false
                            }
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>
                            Access<span className="asterisk">*</span>
                          </InputLabel>
                          <MagicDropDownWithId
                            // disabled={disable}
                            name={`roles[${index}].access`}
                            option={userAccess}
                            label="Access"
                            formik={formik}
                            placeholder="Access"
                            formikName={formik.values.roles[index].access}
                            error={
                              formik?.errors?.roles
                                ? formik?.errors?.roles[index]?.access
                                : ''
                            }
                            touched={
                              formik?.touched?.roles
                                ? formik?.touched?.roles[index]?.access
                                : false
                            }
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Box mt={2} mb={2}>
                      {formik.values.roles.length > 0 && (
                        <>
                          {formik.values.roles.length === 1 ? (
                            ''
                          ) : (
                            <Button
                              variant="outlined"
                              color="secondary"
                              sx={{ mr: 1 }}
                              disabled={
                                //   disable
                                //     ? disable:
                                permission === 'WRITE' || permission === 'FULL'
                                  ? false
                                  : true
                              }
                              onClick={() =>
                                removeModule(index, arrayHelpers, name)
                              } // remove a friend from the list
                            >
                              REMOVE
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1 }}
                            disabled={
                              // disable
                              //   ? disable:
                              permission === 'WRITE' || permission === 'FULL'
                                ? false
                                : true
                            }
                            onClick={() => arrayHelpers.push(obj)} // insert an empty string at a position
                          >
                            ADD
                          </Button>
                        </>
                      )}
                    </Box>
                  </div>
                ))}
              </div>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Module;
