import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import {
  CurrencyType,
  couponApplicationType,
  couponScope,
  couponType,
} from '../../../../data/data';
import { useTranslation } from 'react-i18next';

const GeneralInfo = ({ formik }: any) => {
  const { t, i18n } = useTranslation('translation');
  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    const uppercaseText = inputValue
      .toUpperCase()
      .replace(/\s/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
    formik.setFieldValue('code', uppercaseText);
  };
  return (
    <>
      <Grid container spacing={3.5}>
        {/* <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Promo Code</InputLabel>
            <NormalTextField name="promoCode" placeholder="Enter Promo Code" />
          </Stack>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Coupon Type<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="coupon_type"
              option={couponType}
              label="Coupon Type"
              formik={formik}
              placeholder="Select Coupon Type"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Coupon Application Type<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="coupon_application_type"
              option={couponApplicationType}
              label="Coupon Application Type"
              formik={formik}
              placeholder="Select Coupon Application Type"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Value<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField name="value" placeholder="Enter Value" />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Currency<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="currency"
              placeholder="Enter Currency"
              option={CurrencyType}
              label="Enter Currency"
              formik={formik}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Promo code<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="code"
              placeholder={t('ENTER_PROMO_CODE').toUpperCase()}
              disabled={formik?.values?.id ? true : false}
              onChange={onChangeHandler}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralInfo;
