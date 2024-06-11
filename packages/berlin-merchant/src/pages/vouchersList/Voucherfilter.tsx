import { useEffect, useState } from 'react';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDatePicker, MagicDropDown, NormalTextField } from 'berlin-common';
import { getCategoriesSubCategories } from '../../services/CategorySubcategoryService';
import moment from 'moment';

function VoucherFilter({
  formik,
  filterOpen,
  setFilterOpen,
  i18n,
  filterPayload,
}: any) {
  const [categoryList, setCategoryList] = useState<any>([]);

  const getCategoryList = () => {
    getCategoriesSubCategories(i18n)
      .then((res) => {
        let cat = res.data.data?.category.filter(
          (i: any) => i.subcategory !== true
        );
        setCategoryList(cat);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    getCategoryList();
  }, [i18n]);

  useEffect(() => {
    if (formik.values?.startOrderDate) {
      formik.setFieldValue('endOrderDate', formik.values?.startOrderDate);
    }
  }, [formik.values?.startOrderDate]);
  useEffect(() => {
    if (formik.values?.startRedeemedDate) {
      formik.setFieldValue('endRedeemedDate', formik.values?.startRedeemedDate);
    }
  }, [formik.values?.startRedeemedDate]);
  return (
    <Drawer
      anchor={'right'}
      open={filterOpen}
      onClose={() => setFilterOpen(false)}
    >
      <Box p={2}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container width={200}>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Deal Name</InputLabel>
                  <NormalTextField
                    name="dealName"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Deal Name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Deal Category</InputLabel>
                  <MagicDropDown
                    label="Deal Category"
                    name="category"
                    option={categoryList}
                    formik={formik}
                    placeholder="Deal Category"
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Voucher Code</InputLabel>
                  <NormalTextField
                    name="voucherCode"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Voucher Code"
                  />
                </Stack>
              </Grid>

              <Grid item mt={5} xs={12} sm={12}>
                <MagicDatePicker
                  label="Start Order Date"
                  name="startOrderDate"
                  formik={formik}
                />
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <MagicDatePicker
                  label="End Order Date"
                  name="endOrderDate"
                  formik={formik}
                  minDate={
                    formik.values?.startOrderDate
                      ? formik.values?.startOrderDate
                      : null
                  }
                  maxDate={
                    formik.values?.startOrderDate
                      ? moment(formik.values?.startOrderDate, 'DD-MM-YYYY').add(
                          30,
                          'days'
                        )
                      : null
                  }
                  disabled={!formik?.values?.startOrderDate}
                />
              </Grid>
              {filterPayload?.status === 'REDEEMED' ? (
                <>
                  {' '}
                  <Grid item mt={5} xs={12} sm={12}>
                    <MagicDatePicker
                      label="Start Redeemed Date"
                      name="startRedeemedDate"
                      formik={formik}
                    />
                  </Grid>
                  <Grid item mt={1} xs={12} sm={12}>
                    <MagicDatePicker
                      label="End Redeemed Date"
                      name="endRedeemedDate"
                      formik={formik}
                      disabled={!formik?.values?.startRedeemedDate}
                    />
                  </Grid>{' '}
                </>
              ) : (
                ''
              )}

              <Grid item xs={12} sm={12} mt={3}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => { formik.resetForm(); formik.handleSubmit() }}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </Box>
    </Drawer>
  );
}

export default VoucherFilter;
