import { Button, FormHelperText } from '@mui/material';
import { Grid, InputLabel, Stack, Box } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  MagicDropDownWithId,
  NormalTextField,
} from 'berlin-common';
import { FieldArray } from 'formik';
import { PreferredTime, dealTypePrices } from '../../../data/data';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

const VariablePricing = ({
  isDealPricingDone,
  isBulkAllocationDone,
  formik,
  removeInventoryPrices,
  permission,
  setRemoveInventoryPrices,
  removeTypePricing,
  setRemoveTypePricing,
}: any) => {
  const params = useParams();
  // const dealId: string = params.id ? params.id : '';
  const fieldArrayObj = {
    inventory_min_count: '',
    inventory_max_count: '',
    inventory_sold: '',
    price: '',
  };

  const typePricesArrayObj = {
    type: '',
    translations: [
      {
        column_name: 'name_trans_ids',
        locale: 'en',
        text: '',
      },
      {
        column_name: 'name_trans_ids',
        locale: 'ar',
        text: '',
      },
      {
        column_name: 'description_trans_ids',
        locale: 'en',
        text: '',
      },
      {
        column_name: 'description_trans_ids',
        locale: 'ar',
        text: '',
      },
    ],
    price: '',
    inventory_sold: '',
  };
  const disabledDeal = useMemo(() => {
    return formik.values.deal_type_prices.map((e) => e.type);
  }, [formik.values.deal_type_prices]);

  const removeHandler = (index, arrayHelpers, item) => {
    if (item.id) {
      setRemoveInventoryPrices([
        ...removeInventoryPrices,
        { remove: true, ...item },
      ]);
    }
    arrayHelpers.remove(index);
  };
  const removeTypeHandler = (index, arrayHelpers, item) => {
    if (item.id) {
      setRemoveTypePricing([...removeTypePricing, { remove: true, ...item }]);
    }
    arrayHelpers.remove(index);
  };

  useEffect(() => {
    if (formik.values.template_type?.label == 'Merchant') {
      formik.setFieldValue('is_type_variable_pricing', false);
    }
  }, [formik.values.template_type]);

  // console.log(formik.values.inventory_prices[index].inventory_sold >= 0);
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={12}>
          <InputLabel>Customer Step Pricing</InputLabel>
          <FormHelperText id="standard-weight-helper-text-email-login">
            {
              'Note: This is applicable 1 item per customer only. For multiple, run flash sales.'
            }
          </FormHelperText>
          <CustomSwitchButton
            name="is_inventory_variable_pricing"
            formik={formik}
            label=""
            onChange={(e) => {
              if (e.target.checked) {
                formik.setFieldValue('is_type_variable_pricing', false);
                formik.setFieldValue('is_slot_enabled', false);
                if (formik.values.inventory_prices.length === 0) {
                  formik.setFieldValue('inventory_prices', [fieldArrayObj]);
                }
              }
            }}
            // disabled={isBulkAllocationDone}
          />
          {Boolean(formik?.values?.is_inventory_variable_pricing) && (
            <FieldArray
              name="inventory_prices"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.inventory_prices?.map(
                    (name: any, index: number) => (
                      <div key={index}>
                        <Grid container spacing={3.5}>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Customer min count
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`inventory_prices[${index}].inventory_min_count`}
                                placeholder="Enter customer min count"
                                disabled={
                                  formik.values.inventory_prices[index]
                                    .inventory_sold > 0
                                }
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Customer max count
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`inventory_prices[${index}].inventory_max_count`}
                                placeholder="Enter customer max count"
                                disabled={
                                  formik.values.inventory_prices[index]
                                    .inventory_sold > 0
                                }
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>Customer availed</InputLabel>
                              <NormalTextField
                                name={`inventory_prices[${index}].inventory_sold`}
                                placeholder="Customer availed"
                                disabled
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Price<span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`inventory_prices[${index}].price`}
                                placeholder="Enter price"
                                disabled={
                                  formik.values.inventory_prices[index]
                                    .inventory_sold > 0
                                }
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                        <Box mt={2} mb={2}>
                          {formik.values.inventory_prices.length > 0 && (
                            <>
                              {formik.values.inventory_prices.length === 1
                                ? ''
                                : formik.values.inventory_prices[index]
                                    .inventory_sold == 0 && (
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      sx={{ mt: 1, mr: 1 }}
                                      // onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                      onClick={() =>
                                        removeHandler(index, arrayHelpers, name)
                                      } // remove a friend from the list
                                    >
                                      REMOVE
                                    </Button>
                                  )}
                              <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ mt: 1, mr: 1 }}
                                onClick={() => arrayHelpers.push(fieldArrayObj)} // insert an empty string at a position
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
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel>Type Variable Pricing</InputLabel>
          <CustomSwitchButton
            name="is_type_variable_pricing"
            formik={formik}
            label=""
            onChange={(e) => {
              if (e.target.checked) {
                formik.setFieldValue('is_inventory_variable_pricing', false);
                if (formik.values.deal_type_prices.length === 0) {
                  formik.setFieldValue('deal_type_prices', [
                    typePricesArrayObj,
                  ]);
                }
              }
            }}
            tooltipText={
              formik?.values?.cloneDeal?.id
                ? ''
                : (isDealPricingDone || isBulkAllocationDone) &&
                  'Field is disabled due to bulk insertion completion.'
            }
            disabled={
              formik.values.template_type?.label == 'Merchant'
                ? formik.values.template_type?.label == 'Merchant'
                : formik?.values?.cloneDeal?.id
                  ? false
                  : isDealPricingDone || isBulkAllocationDone
            }
          />
          {Boolean(formik.values.is_type_variable_pricing) && (
            <FieldArray
              name="deal_type_prices"
              render={(arrayHelpers) => (
                <div>
                  {formik.values.deal_type_prices?.map(
                    (name: any, index: number) => (
                      <div key={index}>
                        <Grid container spacing={3.5}>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Type<span className="asterisk">*</span>
                              </InputLabel>
                              <MagicDropDownWithId
                                name={`deal_type_prices[${index}].type`}
                                option={dealTypePrices}
                                label="Slot price"
                                formik={formik}
                                disabledOption={disabledDeal}
                                formikName={
                                  formik?.values?.deal_type_prices[index]?.type
                                }
                                placeholder="Select type"
                                error={
                                  formik?.errors?.deal_type_prices
                                    ? formik?.errors?.deal_type_prices[index]
                                        ?.type
                                    : ''
                                }
                                touched={
                                  formik?.touched?.deal_type_prices
                                    ? formik?.touched?.deal_type_prices[index]
                                    : false
                                }
                                disabled={
                                  formik?.values?.cloneDeal?.id
                                    ? false
                                    : (isDealPricingDone && name?.id) ||
                                      (isBulkAllocationDone && name?.id)
                                }
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Name(English)<span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`deal_type_prices[${index}].translations[0].text`}
                                placeholder="Enter Name (English)"
                                disabled={
                                  formik?.values?.cloneDeal?.id
                                    ? false
                                    : (isDealPricingDone && name?.id) ||
                                      (isBulkAllocationDone && name?.id)
                                }
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Name(Arabic)<span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`deal_type_prices[${index}].translations[1].text`}
                                placeholder="Enter Name (Arabic)"
                                disabled={
                                  formik?.values?.cloneDeal?.id
                                    ? false
                                    : (isDealPricingDone && name?.id) ||
                                      (isBulkAllocationDone && name?.id)
                                }
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Price
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`deal_type_prices[${index}].price`}
                                placeholder="Enter price"
                                disabled={
                                  formik?.values?.cloneDeal?.id
                                    ? false
                                    : (isDealPricingDone && name?.id) ||
                                      (isBulkAllocationDone && name?.id)
                                }
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Description(English)
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`deal_type_prices[${index}].translations[2].text`}
                                placeholder="Enter Description(English)"
                                disabled={
                                  formik?.values?.cloneDeal?.id
                                    ? false
                                    : (isDealPricingDone && name?.id) ||
                                      (isBulkAllocationDone && name?.id)
                                }
                                multiline={true}
                                rows={4}
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Stack spacing={1}>
                              <InputLabel>
                                Description(Arabic)
                                <span className="asterisk">*</span>
                              </InputLabel>
                              <NormalTextField
                                name={`deal_type_prices[${index}].translations[3].text`}
                                placeholder="Enter Description(Arabic)"
                                disabled={
                                  formik?.values?.cloneDeal?.id
                                    ? false
                                    : (isDealPricingDone && name?.id) ||
                                      (isBulkAllocationDone && name?.id)
                                }
                                multiline={true}
                                rows={4}
                              />
                            </Stack>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Stack spacing={1}>
                              <InputLabel>Inventory Sold</InputLabel>
                              <NormalTextField
                                name={`deal_type_prices[${index}].inventory_sold`}
                                placeholder="Enter inventory sold"
                                disabled
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                        <Box mt={2} mb={2}>
                          {formik.values.deal_type_prices.length > 0 && (
                            <>
                              {formik.values.deal_type_prices.length === 1 ? (
                                ''
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  sx={{ mt: 1, mr: 1 }}
                                  disabled={
                                    (permission !== 'WRITE' &&
                                      permission !== 'FULL') ||
                                    (isDealPricingDone && name?.id) ||
                                    (isBulkAllocationDone && name?.id)
                                  }
                                  onClick={() =>
                                    removeTypeHandler(index, arrayHelpers, name)
                                  } // remove a friend from the list
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
                                onClick={() =>
                                  arrayHelpers.push(typePricesArrayObj)
                                } // insert an empty string at a position
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
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default VariablePricing;
