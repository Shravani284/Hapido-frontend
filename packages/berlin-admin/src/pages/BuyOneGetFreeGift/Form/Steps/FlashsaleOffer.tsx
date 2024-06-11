import { Grid, InputLabel, Stack } from '@mui/material';
import { NormalTextField } from 'berlin-common';

const FlashsaleOffer = () => {
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Title(English)<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="title_en"
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
              name="title_ar"
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
              name="tagline_en"
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
              name="tagline_ar"
              placeholder="Enter Tagline (Arabic)"
              multiline={true}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default FlashsaleOffer;
