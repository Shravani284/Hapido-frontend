import { InputLabel } from '@mui/material';
import { Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { GroupDropDown } from 'berlin-common';
import { useEffect, useState } from 'react';

import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../utils/dropDown';
import { useParams } from 'react-router-dom';
import { getCategoriesSubCategories } from '../../../services/dropDownService';

const CategoryInfo = ({ formik, updatedData }: any) => {
  const [primaryCategory, setPrimaryCategory] = useState([]);
  const { id } = useParams();

  // Primary Categories Dropdown
  const getCategoryList = () => {
    getCategoriesSubCategories()
      .then((res) => {
        setPrimaryCategory(res);
        if (updatedData) {
          setDropDownValues(res, updatedData, 'primary_category_id', formik);
          setMultiDropDownValue(
            res,
            updatedData.secondary_category_ids?.split(','),
            'secondary_category_ids',
            formik
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (id) {
      if (updatedData) getCategoryList();
    } else {
      getCategoryList();
    }
  }, [updatedData]);

  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Primary Category<span className="asterisk">*</span>
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
      </Grid>
    </>
  );
};

export default CategoryInfo;
