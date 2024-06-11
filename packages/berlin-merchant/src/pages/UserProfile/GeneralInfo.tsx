import { InputLabel, Stack } from '@mui/material';
import { Box, Grid } from '@mui/material';
import { GroupDropDown, MagicDatePicker, NormalTextField } from 'berlin-common';
import { setMultiDropDownValue } from '../../utils/dropDown';
import { getCategoriesSubCategories } from '../../services/CategorySubcategoryService';
import { useEffect, useState } from 'react';
import useConfig from '../../hooks/useConfig';

const GeneralInfo = ({ formik, updateData }: any) => {
  const [categoryList, setCategoryList] = useState([]);
  const { i18n } = useConfig();

  const getCategoryList = () => {
    getCategoriesSubCategories(i18n)
      .then((res) => {
        setCategoryList(res.data.data.category);
        if (updateData) {
          setMultiDropDownValue(
            res.data.data.category,
            updateData.categories_interest?.split(','),
            'categories_interest',
            formik
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (updateData) {
      getCategoryList();
    }
  }, [i18n, updateData]);
  return (
    <Box sx={{ p: 2.5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Contact Person Name<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="contact_person_name"
              placeholder="contact person name"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Contact Person Mobile<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="contact_person_mobile"
              placeholder=" Contact Person Mobile"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              website<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="website" placeholder="website" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Hapido Sales Person</InputLabel>
            <NormalTextField
              name="hapido_sales_person"
              placeholder="Hapido Sales Person"
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Categories Interest<span className="asterisk">*</span>
            </InputLabel>
            <GroupDropDown
              name="categories_interest"
              option={categoryList}
              label="Categories Interest"
              formik={formik}
              multiple={true}
              placeholder="Categories Interest"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Total Vouchers Sold</InputLabel>
            <NormalTextField
              name="total_vouchers_sold"
              placeholder="Total Vouchers Sold"
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Registered Since</InputLabel>
            <MagicDatePicker
              name="merchant_active_date"
              formik={formik}
              // placeholder="Registered Since"
              disabled
              disablePast
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Account Expiry Date</InputLabel>
            <MagicDatePicker
              name="merchant_expiry_date"
              formik={formik}
              // placeholder="Account Expiry Date"
              disabled
              disablePast
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Total Active Deals</InputLabel>
            <NormalTextField
              name="activeDealsCount"
              placeholder="Total Active Deals"
              disabled
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInfo;
