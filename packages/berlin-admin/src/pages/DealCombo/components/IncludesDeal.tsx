import { Grid, InputLabel, FormHelperText, Stack } from '@mui/material';
import { MagicDropDown } from 'berlin-common';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllDealIds } from '../../../services/dealComboServices';
import { setMultiDropDownValue } from '../../../utils/dropDown';
import {
  getAllDeals,
  includeDealsForCombo,
} from '../../../services/dropDownService';

const IncludesDeal = ({
  formik,
  updatedData, // setRemoveDeals,
  // removeDeals,
}: any) => {
  const { id } = useParams();
  const dealComboId: string = id ? id : '';
  const [dealIdList, setDealIdList] = useState<any>([]);

  const getDealIds = () => {
    includeDealsForCombo()
      .then((res) => {
        // let allSingleDeal = [];
        // if (updatedData) {

        //   allSingleDeal = res.data.allDeals?.filter(
        //     (i: any) =>
        //       updatedData.dealIds.includes(i.id) || i.deal_group_id === null
        //   );
        //   setDealIdList(allSingleDeal);
        // } else {
        //   if (res.success) {
        //     allSingleDeal = res.data?.allDeals?.filter(
        //       (deal) => deal.deal_group_id === null
        //     );
        //     setDealIdList(allSingleDeal);
        //   }
        // }
        setDealIdList(res?.data?.allDeals);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (dealComboId) {
      if (updatedData) getDealIds();
    } else {
      getDealIds();
    }
  }, [updatedData]);

  useEffect(() => {
    if (updatedData && dealComboId && dealIdList) {
      setMultiDropDownValue(
        dealIdList,
        updatedData.dealIds.map((e) => e.id),
        'dealIds',
        formik
      );
    }
  }, [dealComboId, updatedData, dealIdList]);
  // useEffect(() => {
  //   if (updatedData && formik.values.dealIds) {
  //     const formikDealIds = formik.values.dealIds.map((deal) => deal.id);
  //     const updatedDealIds = updatedData.dealIds.map((deal) => deal.id);

  //     const removedDealIds = updatedDealIds.filter(
  //       (id) => !formikDealIds.includes(id)
  //     );

  //     setRemoveDeals(removedDealIds);
  //   }
  // }, [formik.values.dealIds, updatedData]);

  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deals<span className="asterisk">*</span>
            </InputLabel>
            <FormHelperText id="standard-weight-helper-text-email-login">
              {
                'Note: Combo is not applicable for deal with inventory variable pricing (Ex: 1 AED first 10 customers, 10 AED next 20 customers), type variable pricing (Ex: Adult|Child|Infant), location specific deal (Ex: Select location), slot based deals.'
              }
            </FormHelperText>
            <MagicDropDown
              name="dealIds"
              option={dealIdList}
              label="Deals"
              formik={formik}
              placeholder="Select Deals"
              multiple
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default IncludesDeal;
