import { Button, ListItem } from '@mui/material';
import { Grid, InputLabel, Stack } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  MagicDropDownWithId,
  NormalTextField,
} from 'berlin-common';
import { FieldArray } from 'formik';
import { addressLabel } from '../../../data/data';
import { useEffect, useState } from 'react';
import { removeUserAddress } from '../../../services/userService';

const UserAddress = ({ formik, areaList, permission }: any) => {
  const obj = {
    address_label: '',
    is_primary: false,
    address1: '',
    address2: '',
    area_id: null,
  };
  const handlePrimaryToggle = (index, e) => {
    if (e === true) {
      const newArray = [...formik.values.addresses];
      const data = newArray.map((item, i) => {
        if (i == index) {
          return { ...item, is_primary: true };
        } else {
          return { ...item, is_primary: false };
        }
      });
      formik.setFieldValue('addresses', data);
    }
  };

  const removeModule = (i: any, arrayHelpers, name) => {
    if (name.id) {
      const payload = {
        id: name.id,
        user_id: name.user_id,
      };
      removeUserAddress(payload)
        .then((response) => {
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
            name="addresses"
            render={(arrayHelpers) => (
              <div>
                {formik.values.addresses?.map((name: any, index: number) => (
                  <div key={index}>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>
                            Address Label<span className="asterisk">*</span>
                          </InputLabel>
                          <MagicDropDownWithId
                            name={`addresses[${index}].address_label`}
                            option={addressLabel}
                            label="Address label"
                            formik={formik}
                            placeholder="Address label"
                            formikName={
                              formik.values.addresses[index].address_label
                            }
                            error={
                              formik?.errors?.addresses
                                ? formik?.errors?.addresses[index]
                                    ?.address_label
                                : ''
                            }
                            touched={
                              formik?.touched?.addresses
                                ? formik?.touched?.addresses[index]
                                    ?.address_label
                                : false
                            }
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>
                            Area<span className="asterisk">*</span>
                          </InputLabel>
                          <MagicDropDownWithId
                            name={`addresses[${index}].area_id`}
                            option={areaList}
                            label="Area"
                            formik={formik}
                            placeholder="Area"
                            formikName={formik.values.addresses[index].area_id}
                            error={
                              formik?.errors?.addresses
                                ? formik?.errors?.addresses[index]?.area_id
                                : ''
                            }
                            touched={
                              formik?.touched?.addresses
                                ? formik?.touched?.addresses[index]?.area_id
                                : false
                            }
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>
                            Address line 1<span className="asterisk">*</span>
                          </InputLabel>
                          <NormalTextField
                            name={`addresses[${index}].address1`}
                            placeholder=" Address Line 1"
                          />
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>
                            Address line 2<span className="asterisk">*</span>
                          </InputLabel>
                          <NormalTextField
                            name={`addresses[${index}].address2`}
                            placeholder=" Address Line 2"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <InputLabel>Primary</InputLabel>
                          {/* {formik.values.addresses[
                            index
                          ].is_primary?.toString()} */}
                          <CustomSwitchButton
                            name={`addresses[${index}].is_primary`}
                            checked={name.is_primary}
                            formik={formik}
                            label=""
                            onChange={(e) => {
                              handlePrimaryToggle(index, e.target.checked);
                            }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid item mb={4} xs={12} sm={6}>
                      {formik.values.addresses.length != 1 && (
                        <>
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1 }}
                            disabled={
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
                        </>
                      )}
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        sx={{ mr: 1 }}
                        onClick={() => arrayHelpers.push(obj)} // insert an empty string at a position
                      >
                        ADD
                      </Button>
                    </Grid>
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

export default UserAddress;
