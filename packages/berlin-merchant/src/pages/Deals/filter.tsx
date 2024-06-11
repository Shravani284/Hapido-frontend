import { useEffect, useState } from 'react';
import { Button, InputLabel, Stack } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/material';
import { Field, FormikProvider } from 'formik';
import { Grid } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { dealType, status, vouchertype } from '../../data/data';
import { getCategoriesSubCategories } from '../../services/CategorySubcategoryService';

function Filter({ formik, filterOpen, setFilterOpen, i18n, setPage }: any) {
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
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Active</InputLabel>
                  <MagicDropDown
                    label="Status"
                    name="status"
                    option={status}
                    formik={formik}
                    placeholder="Status"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Deals Type</InputLabel>
                  <MagicDropDown
                    label="Deals Type"
                    name="dealtype"
                    option={dealType}
                    formik={formik}
                    placeholder="Deals Type"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <InputLabel>Voucher Type</InputLabel>
                  <MagicDropDown
                    label="Voucher Type"
                    name="vouchertype"
                    option={vouchertype}
                    formik={formik}
                    placeholder="Voucher Type"
                    disabled={formik?.values?.dealtype?.id !== 'single'}
                  />
                </Stack>
              </Grid>
              <Grid item mt={1} xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>Deal Id</InputLabel>
                  <NormalTextField
                    name="dealid"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Deal Id"
                    disabled={formik?.values?.dealtype?.id !== 'single'}
                  />
                </Stack>
              </Grid>
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
              <Grid item xs={12} sm={12} mt={2}>
                <Stack spacing={1}>
                  <InputLabel>Deal Booking</InputLabel>
                  <div role="group">
                    <InputLabel>
                      <Field
                        type="radio"
                        name="dealBookingfilter"
                        value="Y"
                        disabled={formik?.values?.dealtype?.id !== 'single'}
                      />
                      Yes
                    </InputLabel>
                    <InputLabel>
                      <Field
                        type="radio"
                        name="dealBookingfilter"
                        value="N"
                        disabled={formik?.values?.dealtype?.id !== 'single'}
                      />
                      No
                    </InputLabel>
                    <InputLabel>
                      <label
                        htmlFor=""
                        style={{ color: 'rgba(252, 28, 21, 0.9)!important' }}
                      >
                        <Field
                          type="radio"
                          name="dealBookingfilter"
                          value="A"
                          style={{ color: 'rgba(252, 28, 21, 0.9) !important' }}
                          disabled={formik?.values?.dealtype?.id !== 'single'}
                        />
                      </label>
                      All
                    </InputLabel>
                  </div>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} mt={1}>
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
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => setPage(0)}
                  >
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

export default Filter;
