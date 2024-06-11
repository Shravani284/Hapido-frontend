import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { PlatformType } from '../../../data/data';
const GeneralInfo = ({ formik }: any) => {
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
  return (
    <>
      <div>
        <Grid container spacing={3.5}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Title(English)<span className="asterisk">*</span>
              </InputLabel>
              <NormalTextField
                name={`translations[${enTitle}].text`}
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
                name={`translations[${arTitle}].text`}
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
                name={`translations[${enTag}].text`}
                placeholder="Enter Tagline (English)"
                multiline={true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Tagline(Arabic)<span className="asterisk">*</span>
              </InputLabel>
              <NormalTextField
                name={`translations[${arTag}].text`}
                placeholder="Enter Tagline (Arabic)"
                multiline={true}
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
      </div>
    </>
  );
};

export default GeneralInfo;
