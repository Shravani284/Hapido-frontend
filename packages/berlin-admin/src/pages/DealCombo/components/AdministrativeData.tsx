import { InputLabel, Stack } from '@mui/material';
import { Grid } from '@mui/material';
import {
  CustomSwitchButton,
  MagicDropDown,
  NormalTextField,
} from 'berlin-common';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllTags } from '../../../services/tagService';
import { setMultiDropDownValue } from '../../../utils/dropDown';
import { tagDropDown } from '../../../services/dropDownService';

const AdministrativeData = ({ formik, updatedData }: any) => {
  const [dealTagList, setDealTagList] = useState([]);
  const params = useParams();
  const dealBundleId: string = params.id ? params.id : '';
  const allTag = () => {
    tagDropDown()
      .then((res) => {
        if (res.success) {
          const tagList = res.data.allTags;
          if (updatedData) {
            setMultiDropDownValue(
              tagList,
              updatedData.dealTags.map((e: any) => e.tag_id),
              'deal_tags',
              formik
            );
          }
          setDealTagList(tagList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (dealBundleId) {
      if (updatedData) allTag();
    } else {
      allTag();
    }
  }, [updatedData]);
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Active</InputLabel>
            <CustomSwitchButton name="active" formik={formik} label="" />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Is home widget deal</InputLabel>
            <CustomSwitchButton
              name="is_home_widget_deal"
              formik={formik}
              label=""
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Notes</InputLabel>
            <NormalTextField
              name="notes"
              placeholder="Enter notes"
              multiline={true}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Rating</InputLabel>
            <NormalTextField name="rating" placeholder="Enter Rating" />
          </Stack>
        </Grid>
        {formik.values.is_home_widget_deal ? (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Home widget priority <span className="asterisk">*</span>
              </InputLabel>
              <NormalTextField
                name={`home_widget_priority`}
                placeholder="Home widget priority"
              />
            </Stack>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal Tags<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="deal_tags"
              option={dealTagList}
              label="deal_tags"
              formik={formik}
              placeholder="Select Deal Tag"
              multiple={true}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default AdministrativeData;
