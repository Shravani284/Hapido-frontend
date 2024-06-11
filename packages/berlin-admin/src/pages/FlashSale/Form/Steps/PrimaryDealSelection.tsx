import { Box, Grid, InputLabel, Stack } from '@mui/material';
import { MagicDropDown } from 'berlin-common';
import { useEffect, useState } from 'react';
import { PrimarySale } from '../../../../data/data';

import { TranslationType } from '../../../category/constants/types';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../../utils/dropDown';
import {
  allBundleList,
  allComboList,
  allDealsList,
} from '../../../../services/commonService';
import { CircularProgress } from '@mui/material';
import {
  allDealListDD,
  excludeDealBundle,
} from '../../../../services/dropDownService';

const PrimaryDealSelection = ({ formik, dealList, dealListbyid }: any) => {
  const [allDealsID, setAllDealsID] = useState([]);
  const [allDeals, setAllDeals] = useState([]);
  const [dealsExclude, setDealsExclude] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const dealTypeData = (item: any) => {
    const obj = { ...item };

    if (item.translations.length > 0) {
      const title_en = item.translations.find(
        (ele: TranslationType) =>
          ele.locale === 'en' && ele.column_name === 'title_trans_ids'
      );

      obj.label = `${title_en?.text ?? ''}`;
    }

    return {
      id: item.id,

      label: obj.label,
    };
  };

  const getDeals = (data?: any) => {
    if (formik?.values?.deal_id_1_type) {
      let slotType = 'bosd1';
      allDealListDD(formik.values?.deal_id_1_type?.id, slotType)
        .then((res) => {
          if (res?.success == true) {
            setAllDealsID(res?.data?.allDeals);
            if (dealListbyid) {
              setDropDownValues(
                res?.data?.allDeals,
                dealListbyid,
                'deal_id_1',
                formik
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getExcludeDeals = (ExcludeDealsData: any) => {
    const dealID = ExcludeDealsData?.deal_id_1;
    if (dealID) {
      excludeDealBundle(dealID ? dealID?.id : '')
        .then((res) => {
          setDealsExclude(res?.data?.allDeals);
          if (dealListbyid) {
            setMultiDropDownValue(
              res?.data?.allDeals,
              dealListbyid.deal_1_exclude_option_ids?.split(','),
              'deal_1_exclude_option_ids',
              formik
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getDeals(formik.values);
  }, [formik.values.deal_id_1_type?.id]);

  useEffect(() => {
    getExcludeDeals(formik.values);
  }, [formik.values.deal_id_1?.id]);

  return (
    <>
      <Grid container spacing={3.5}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal Type<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="deal_id_1_type"
              option={PrimarySale}
              label="Deal Type"
              formik={formik}
              placeholder="Deal Type"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <Stack spacing={1}>
              <InputLabel>
                Deal Selection<span className="asterisk">*</span>
              </InputLabel>
              <MagicDropDown
                name="deal_id_1"
                option={allDealsID}
                label="Deal Selection"
                formik={formik}
                placeholder="Deal Selection"
                onChange={(e) => {
                  formik.setFieldValue('deal_1_exclude_option_ids', []);
                }}
              />
              {isLoading && (
                <CircularProgress
                  sx={{
                    position: 'absolute',
                    right: '70px',
                    marginTop: '40px !important',
                    color: 'red',
                  }}
                  color="secondary"
                  style={{ marginRight: 5 }}
                  size={15}
                />
              )}
            </Stack>
          </Box>
        </Grid>

        {formik.values.deal_id_1_type?.id === 'BUNDLE' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Exclusions For Bundle</InputLabel>
              <MagicDropDown
                multiple={true}
                name="deal_1_exclude_option_ids"
                option={dealsExclude || []}
                label="Select Deal Exclude"
                formik={formik}
                placeholder="Select Deal Exclude"
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default PrimaryDealSelection;
