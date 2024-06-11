import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { useState, useEffect } from 'react';
import { DealType, PlatformType } from '../../../data/data';

const GeneralInfo = ({ formik }: any) => {
  const [name, setName] = useState<any>();
  useEffect(() => {
    const enTitle = formik.values.translations.findIndex(
      (e: any) => e.column_name === 'title_trans_ids' && e.locale === 'en'
    );
    const arTitle = formik.values.translations.findIndex(
      (e: any) => e.column_name === 'title_trans_ids' && e.locale === 'ar'
    );
    const enTag = formik.values.translations.findIndex(
      (e: any) => e.column_name === 'tagline_trans_ids' && e.locale === 'en'
    );
    const arTag = formik.values.translations.findIndex(
      (e: any) => e.column_name === 'tagline_trans_ids' && e.locale === 'ar'
    );
    setName({ enTitle, arTitle, enTag, arTag });
  }, [formik.values.translations]);
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Title(English)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name={`translations[${name?.enTitle}].text`}
              placeholder="Enter Title (English)"
              multiline={true}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Title(Arabic)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name={`translations[${name?.arTitle}].text`}
              placeholder="Enter Title (Arabic)"
              multiline={true}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Tagline(English)<span className="asterisk">*</span>
            </InputLabel>

            <NormalTextField
              placeholder="Enter Tagline"
              name={`translations[${name?.enTag}].text`}
              multiline={true}
              rows={4}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Tagline(Arabic)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name={`translations[${name?.arTag}].text`}
              placeholder="Enter Tagline (Arabic)"
              multiline={true}
              rows={4}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Platform<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="platform"
              option={PlatformType}
              label="language"
              formik={formik}
              placeholder="Select Platform"
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default GeneralInfo;
