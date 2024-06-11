import { Grid, InputLabel, Stack } from '@mui/material';
import { GroupDropDown, MagicDropDown } from 'berlin-common';
import { PlatformType, couponScope } from '../../../../data/data';
import { useEffect } from 'react';

interface Iprops {
  formik: any;
  categoriesList: { label: string; id: string | number }[];
  dealList: { label: string; id: string | number }[];
  dealExcludeList: { label: string; id: string | number }[];
  dealCombo: { label: string; id: string | number }[];
  dealExcludeCombo: { label: string; id: string | number }[];
  flashSale: { label: string; id: string | number }[];
}

const CouponSpecifics = ({
  formik,
  categoriesList,
  dealList,
  dealExcludeList,
  dealCombo,
  dealExcludeCombo,
  flashSale,
}: Iprops) => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Coupon Scope<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="coupon_scope"
              option={couponScope}
              label="Enter Coupon Scope"
              formik={formik}
              placeholder="Coupon Scope"
            />
          </Stack>
        </Grid>
        {formik.values.coupon_scope?.id === 'DEAL' && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Deal
                  {!formik.values.combo_deal_id && (
                    <span className="asterisk">*</span>
                  )}
                </InputLabel>
                <MagicDropDown
                  name="deal_id"
                  option={dealList}
                  label="Deal"
                  formik={formik}
                  placeholder="Select Deal"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Deal Combo
                  {!formik.values.deal_id && (
                    <span className="asterisk">*</span>
                  )}
                </InputLabel>
                <MagicDropDown
                  name="combo_deal_id"
                  option={dealCombo}
                  label=" Deal Combos"
                  formik={formik}
                  placeholder="Select Deal Combos"
                  // multiple={true}
                />
              </Stack>
            </Grid>
          </>
        )}
        {formik.values.coupon_scope?.id === 'CATEGORY' && (
          <>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Category<span className="asterisk">*</span>
                </InputLabel>
                <GroupDropDown
                  name="category_id"
                  option={categoriesList}
                  label="Enter Category"
                  formik={formik}
                  placeholder="Category"
                  onChange={() => {
                    formik.setFieldValue('exclude_deal_ids', []);
                    formik.setFieldValue('exclude_combo_ids', []);
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Exclude Deals</InputLabel>
                <MagicDropDown
                  name="exclude_deal_ids"
                  option={dealExcludeList}
                  label="Exclude Deals"
                  formik={formik}
                  placeholder="Select Exclude Deals"
                  multiple={true}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>Exclude Deal Combo</InputLabel>
                <MagicDropDown
                  name="exclude_combo_ids"
                  option={dealExcludeCombo}
                  label="Exclude Deal Combos"
                  formik={formik}
                  placeholder="Select Exclude Combos"
                  multiple={true}
                />
              </Stack>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Exclude Applicable Flash Sale</InputLabel>
            <MagicDropDown
              name="exclude_applicable_flash_sales"
              option={flashSale}
              label="Exclude Applicable Flash Sale"
              formik={formik}
              placeholder="Select Flash Sale"
              multiple={true}
            />
          </Stack>
        </Grid>
        {formik.values.coupon_scope?.id === 'ALL' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Exclude Categories</InputLabel>
              <GroupDropDown
                name="exclude_category_ids"
                option={categoriesList}
                label="Enter Category"
                formik={formik}
                placeholder="Select Category"
                multiple={true}
              />
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Platform<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="platform"
              option={PlatformType}
              label="Platform"
              formik={formik}
              placeholder="Select Platform"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CouponSpecifics;
