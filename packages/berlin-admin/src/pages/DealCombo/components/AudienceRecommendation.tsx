import { InputLabel, Stack } from '@mui/material';
import { Grid } from '@mui/material';
import { MagicDropDown } from 'berlin-common';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { setMultiDropDownValue } from '../../../utils/dropDown';
import { travelerTypesList } from '../../../services/dropDownService';

const AudienceRecommendation = ({ formik, updatedData }: any) => {
  const params = useParams();
  const dealId: string = params.id ? params.id : '';
  const [travelTypeData, setTravelTypeData] = useState<any>([]);
  const getTraverTypesList = (updatedData?: any) => {
    travelerTypesList()
      .then((response) => {
        if (response.success) {
          setTravelTypeData(response.data.alltravellertypes);
          if (updatedData) {
            setMultiDropDownValue(
              response.data.alltravellertypes,
              updatedData.dealTravellerTypes.map((e: any) => e.traveller_id),
              'traveller_types',
              formik
            );
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (dealId) {
      if (updatedData) getTraverTypesList(updatedData);
    } else {
      getTraverTypesList('');
    }
  }, [updatedData]);

  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Suggested Traveler Type<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="traveller_types"
              option={travelTypeData}
              label="Suggested Traveler Type"
              formik={formik}
              placeholder="Suggested Traveler Type"
              multiple
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AudienceRecommendation;
