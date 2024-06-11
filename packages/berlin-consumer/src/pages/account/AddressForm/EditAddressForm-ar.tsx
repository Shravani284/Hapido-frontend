import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import css from './AddressStyle.module.scss';
import { path } from '../../../routes/Routers';
import { MAP_KEY } from '../../../../../../urlConst';
import { MagicDropDown, MagicTextField } from 'berlin-common';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useTranslation } from 'react-i18next';
import { lang } from '../../../utils/getLang';

export default function EditAddressFormAr({
  formik,
  coordinatesData,
  countryData,
  isLoading1,
  isLoading2,
  cityData,
  areaList,
  mapAddress,
  setCoordinatesData,
  isLoading3,
}: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state && location.state.data;
  const { t } = useTranslation('translation');
  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={12}
          xl={12}
          style={{ position: 'relative' }}
        >
          <div className={css.addressMap}>
            <img
              src={`http://maps.googleapis.com/maps/api/staticmap?center=${coordinatesData}&zoom=16&markers=size:mid%7Ccolor:red%7C${coordinatesData}&size=800x200&scale=2&key=${MAP_KEY}`}
              alt={t('SELECTED_LOCATION')}
            />
            <Button
              className={css.editBtn}
              onClick={() =>
                navigate(`/${lang}/address/addAddressMap`, {
                  state: {
                    data: { ...location.state.data },
                  },
                })
              }
              style={{
                position: 'absolute',
                bottom: '35px',
                left: '35px',
              }}
            >
              {t('EDIT')}
            </Button>
          </div>
          <Divider style={{ marginTop: '20px' }} />
        </Grid>

        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <InputLabel>{t('ADDRESS_1')}</InputLabel>
          <MagicTextField
            className={css.validation}
            placeholder={t('ADDRESS_1')}
            type="text"
            name="address1"
            id="Address1"
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <InputLabel>{t('ADDRESS_2')}</InputLabel>
          <MagicTextField
            className={css.validation}
            placeholder={t('ADDRESS_2')}
            type="text"
            name="address2"
            id="Address2"
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={4} xl={4}>
          <Stack className={css.addArea} spacing={1}>
            <InputLabel>{t('COUNTRY')}</InputLabel>
            <div className={css.loaderCont}>
              <MagicDropDown
                className={css.validation}
                name="country"
                option={countryData}
                label="Country"
                formik={formik}
                placeholder={t('COUNTRY')}
              />

              {isLoading1 && (
                <div className={css.loaderPlace}>
                  <CircularProgress
                    sx={{
                      color: 'red',
                    }}
                    color="secondary"
                    size={14}
                  />
                </div>
              )}
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} lg={4} xl={4}>
          <Stack className={css.addArea} spacing={1}>
            <InputLabel>{t('CITY')}</InputLabel>
            <div className={css.loaderCont}>
              <MagicDropDown
                className={css.validation}
                name="city"
                option={cityData}
                label="City"
                formik={formik}
                placeholder={t('CITY')}
              />
              {isLoading2 && (
                <div className={css.loaderPlace}>
                  <CircularProgress
                    sx={{
                      color: 'red',
                    }}
                    color="secondary"
                    size={14}
                  />
                </div>
              )}
            </div>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} lg={4} xl={4}>
          <Stack className={css.addArea} spacing={1}>
            <InputLabel>{t('AREA')}</InputLabel>
            <div className={css.loaderCont}>
              <MagicDropDown
                className={css.validation}
                name="area_id"
                option={areaList}
                label="Area"
                formik={formik}
                placeholder={t('SELECT_AREA')}
                onChange={(value) => {
                  !mapAddress?.cord && setCoordinatesData(value?.coordinates);
                }}
              />
              {isLoading3 && (
                <div className={css.loaderPlace}>
                  <CircularProgress
                    sx={{
                      color: 'red',
                    }}
                    color="secondary"
                    size={14}
                  />
                </div>
              )}
            </div>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} lg={12} xl={12} display={'flex'}>
          <Checkbox
            sx={{
              color: 'red',
              '&.Mui-checked': {
                color: 'red',
              },
            }}
            checked={formik.values.is_primary}
            onChange={(value) => {
              formik.setFieldValue('is_primary', value.target.checked);
            }}
          />
          <InputLabel style={{ padding: '7px' }}>
            {t('SET_A_DEFAULT_ADDRESS')}
          </InputLabel>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} xl={6} display={'flex'}>
          <Select
            className={css.addressType}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.address_label}
            label={t('AGE')}
            onChange={(e) => {
              formik.setFieldValue('address_label', e.target.value);
            }}
            IconComponent={() => (
              <ArrowDropDownIcon style={{ color: '#fff' }} />
            )} // Customize the color here
          >
            <MenuItem value={'Home'}>{t('HOME')}</MenuItem>
            <MenuItem value={'Office'}>{t('OFFICE')}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} xl={6} className={css.addressBtn}>
          <Box>
            <Button
              className={css.cancelBtn}
              onClick={() => navigate(-1)}
              type="button"
            >
              {t('CANCEL')}
            </Button>
          </Box>
          <Box>
            <Button
              style={{ marginRight: '15px' }}
              className={css.saveBtn}
              type="submit"
            >
              {t('SAVE_CHANGES')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
