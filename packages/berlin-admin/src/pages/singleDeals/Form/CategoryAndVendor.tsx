import { InputLabel } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { GroupDropDown, MagicDropDown } from 'berlin-common';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  merchantDropDownApi,
  merchantDropdown,
} from '../../../services/dealsService';
import { useParams } from 'react-router-dom';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../utils/dropDown';
import { merchantActiveList } from '../../../services/dropDownService';
import { getCategoriesSubCategories } from '../../../services/dropDownService';
import { useTranslation } from 'react-i18next';

const CategoryAndVendor = ({ formik, dealData }: any) => {
  const params = useParams();
  const dealId: string = params.id ? params.id : '';
  const [primaryCategory, setPrimaryCategory] = useState([]);
  const [merchantDropDown, setMerchantDropDown] = useState([]);
  const { t, i18n } = useTranslation('translation');
  // Primary Categories Dropdown
  const getPrimaryCategory = () => {
    getCategoriesSubCategories()
      .then((res) => {
        setPrimaryCategory(res);
        if (dealData) {
          setDropDownValues(res, dealData, 'primary_category_id', formik);
          setMultiDropDownValue(
            res,
            dealData.secondary_category_ids.split(','),
            'secondary_category_ids',
            formik
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // Merchant  Dropdown
  const getMerchant = () => {
    merchantActiveList(i18n.language)
      .then((res) => {
        // const activeMerchants = res.filter((i: any) => i.active === 1);
        setMerchantDropDown(res?.data?.data?.marchants);
        if (dealData) {
          setDropDownValues(
            res?.data?.data?.marchants,
            dealData,
            'merchant_id',
            formik
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const getAllDropDown = () => {
    getMerchant();
    getPrimaryCategory();
  };

  useEffect(() => {
    if (dealId) {
      if (dealData) getAllDropDown();
    } else {
      getAllDropDown();
    }
  }, [dealData]);
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Primary Categories<span className="asterisk">*</span>
            </InputLabel>
            <GroupDropDown
              name="primary_category_id"
              option={primaryCategory}
              label="Primary Category"
              formik={formik}
              placeholder="Select Primary Category"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Secondary Categories</InputLabel>
            <GroupDropDown
              name="secondary_category_ids"
              option={primaryCategory}
              label="Secondary Category"
              formik={formik}
              placeholder="Select Secondary Category"
              multiple
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Merchant<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="merchant_id"
              option={merchantDropDown}
              label="Merchant"
              formik={formik}
              placeholder="Select Merchant"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryAndVendor;
