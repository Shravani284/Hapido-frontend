import { CircularProgress, Grid, InputLabel, Stack } from '@mui/material';
import { GroupDropDown, MagicDropDown, NormalTextField } from 'berlin-common';
import React, { useEffect, useState } from 'react';
import { PromoType, buyfreegiftType } from '../../../../data/data';

import { TranslationType } from '../../../category/constants/types';
import {
  setDropDownValues,
  setMultiDropDownValue,
} from '../../../../utils/dropDown';
import { allComboList, allDealsList } from '../../../../services/commonService';
import {
  allDealListDD,
  getAllDeal,
  getAllPROMO,
  getCategoriesSubCategories,
} from '../../../../services/dropDownService';

const PrimaryDealSelection = ({ formik, freeGiftsData }: any) => {
  const [allDealsID, setAllDealsID] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [dealList, setDealList] = useState([]);
  const [promoCodeList, setPromoCodeList] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const getDeals = (data?: any) => {
    if (formik.values?.free_deal_type?.id) {
      allDealListDD(formik?.values?.free_deal_type?.id)
        .then((res) => {
          if (res?.success == true) {
            setAllDealsID(res?.data?.allDeals);
            if (freeGiftsData) {
              setDropDownValues(
                res?.data?.allDeals,
                freeGiftsData,
                'free_deal_id',
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

  useEffect(() => {
    getDeals(formik.values);
    getPromoCodeList(formik.values);
    getCategoriesList();
  }, [formik.values.free_deal_type?.id]);

  // useEffect(() => {
  //   getDealList(formik.values);
  // }, [freeGiftsData]);

  // const getDealList = (data?: any) => {
  //   getAllDeal()
  //     .then((res) => {
  //       if (res?.success == true) {
  //         setDealList(res?.data?.deals);
  //         if (data) {
  //           setDropDownValues(res?.data?.deals, data, 'deal_id', formik);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getPromoCodeList = (data?: any) => {
    getAllPROMO()
      .then((res) => {
        if (res?.success == true) {
          const promos = res?.data?.promos.map((item: any) => {
            return {
              ...item,
              label: item.code,
            };
          });
          setPromoCodeList(promos);
          if (data) {
            setDropDownValues(
              promos,
              freeGiftsData,
              'free_promo_code_id',
              formik
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoriesList = () => {
    getCategoriesSubCategories()
      .then((response) => {
        setAllCategory(response);

        if (freeGiftsData) {
          setMultiDropDownValue(
            response,
            freeGiftsData?.exclude_category_ids?.split(','),
            'exclude_category_ids',
            formik
          );
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   if (freeGiftsData) {
  //     getCategoriesList();
  //   } else {
  //     getCategoriesList();
  //   }
  // }, []);
  return (
    <>
      <Grid container spacing={3.5}>
        {/* <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Deal Selection<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="deal_id"
              option={dealList}
              label="Deal Selection"
              formik={formik}
              placeholder="Deal Selection"
            />
          </Stack>
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Min Cart Amount<span className="asterisk">*</span>
            </InputLabel>
            <NormalTextField
              name="min_cart_amount"
              placeholder="Min Cart Amount"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>Exclude Categories</InputLabel>
            <GroupDropDown
              name="exclude_category_ids"
              option={allCategory}
              label="Enter Exclude Category"
              formik={formik}
              placeholder="Select Exclude Categories"
              multiple={true}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <InputLabel>
              Free Entitlement<span className="asterisk">*</span>
            </InputLabel>
            <MagicDropDown
              name="free_entitlement"
              option={PromoType}
              label="Free Entitlement"
              formik={formik}
              placeholder="Free Entitlement"
            />
          </Stack>
        </Grid>

        {formik.values.free_entitlement?.id === 'PROMO CODE' && (
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>
                Free Promo Code<span className="asterisk">*</span>
              </InputLabel>
              <MagicDropDown
                name="free_promo_code_id"
                option={promoCodeList}
                label="Free Promo Code"
                formik={formik}
                placeholder="Free Promo Code"
              />
            </Stack>
          </Grid>
        )}

        {formik.values.free_entitlement?.id === 'DEAL' && (
          <>
            <Grid item xs={12} sm={6}>
              <InputLabel>
                Deal Type<span className="asterisk">*</span>
              </InputLabel>
              <MagicDropDown
                name="free_deal_type"
                option={buyfreegiftType}
                label="Deal Type"
                formik={formik}
                placeholder="Deal Type"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack>
                <InputLabel>
                  Free Deal<span className="asterisk">*</span>
                </InputLabel>
                <MagicDropDown
                  name="free_deal_id"
                  option={allDealsID}
                  label="Free Deal"
                  formik={formik}
                  placeholder="Free Deal"
                />
                {isLoading && (
                  <CircularProgress
                    sx={{
                      position: 'absolute',
                      right: '70px',
                      marginTop: '33px',
                      color: 'red',
                    }}
                    color="secondary"
                    style={{ marginRight: 5 }}
                    size={15}
                  />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel>
                  Free Deal Quantity<span className="asterisk">*</span>
                </InputLabel>
                <NormalTextField
                  name="free_deal_quantity"
                  placeholder="Free Deal Quantity"
                />
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default PrimaryDealSelection;
