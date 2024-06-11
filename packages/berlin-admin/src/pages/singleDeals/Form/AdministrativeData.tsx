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
import { approvalStatus, onboardingStatus } from '../../../data/data';
import { tagDropDown } from '../../../services/dropDownService';
import { useSelector } from 'react-redux';

const AdministrativeData = ({ formik, dealData }: any) => {
  const [dealTagList, setDealTagList] = useState([]);
  const params = useParams();
  const dealBundleId: string = params.id ? params.id : '';
  const allTag = () => {
    tagDropDown()
      .then((res) => {
        if (res.success) {
          const tagList = res.data.allTags;
          if (dealData) {
            setMultiDropDownValue(
              tagList,
              dealData.dealTags.map((e: any) => e.tag_id),
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
      if (dealData) allTag();
    } else {
      allTag();
    }
  }, [dealData]);
  const disabledStatus = [
    'REJECTED',
    'DETAILS_INPROGRESS',
    'REQUIRE_INFO',
    'PUBLISHED',
  ];
  const dept = useSelector((store: any) => store?.login?.loginDetails);
  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal onboarding status<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="deal_onboarding_status"
              option={onboardingStatus}
              label="Deal onboarding status"
              formik={formik}
              placeholder="Deal onboarding status"
              disabledOption={
                dept.departments.every(
                  (department) =>
                    department.department_name === 'BUSINESS_DEVELOPMENT' &&
                    department.designation === 'EXECUTIVE'
                )
                  ? disabledStatus
                  : []
              }
            />
          </Stack>
        </Grid>
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

        <Grid item xs={12} sm={6}>
          <InputLabel>Active</InputLabel>
          <CustomSwitchButton name="active" formik={formik} label="" />
        </Grid>
      </Grid>
    </>
  );
};

export default AdministrativeData;
