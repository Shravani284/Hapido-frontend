import { Button } from '@mui/material';
import { Grid, InputLabel, Stack } from '@mui/material';
import { MagicDropDownWithId, NormalTextField } from 'berlin-common';
import { useState, useEffect, useMemo } from 'react';
import { getAllActiveDeal } from '../../../../services/dealBundleService';
import { useParams } from 'react-router-dom';
import { FieldArray } from 'formik';
import { Box } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { getAllDeals } from '../../../../services/dropDownService';

const IncludesDeal = ({
  formik,
  dealDetails,
  setremoveDeals,
  removeDeals,
  permission,
}: any) => {
  const params = useParams();
  const dealBundleId: string = params.id ? params.id : '';
  const [dealList, setDealList] = useState([]);
  const allDeals = () => {
    getAllDeals()
      .then((res) => {
        if (res.success) {
          setDealList(res.data.allDeals);
        }
        //   let allSingleDeal = [];
        //   if (dealDetails) {
        //     const data = dealDetails.dealIds.map((e: { id: string }) => e.id);
        //     allSingleDeal = res.data.allDeals.filter(
        //       (i: any) => data.includes(i.id) || i.deal_bundle_id === null
        //     );
        //     setDealList(allSingleDeal);
        //   } else {
        //     allSingleDeal = res.data?.allDeals.filter(
        //       (i: any) => i.deal_bundle_id === null
        //     );
        //     setDealList(allSingleDeal);
        //   }
        // }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (dealBundleId) {
      if (dealDetails) {
        allDeals();
      }
    } else {
      allDeals();
    }
  }, [dealBundleId, dealDetails]);

  const SlotArrayObj = { dealId: '', priority: '' };
  const disabledDeal = useMemo(() => {
    return formik.values.dealIds.map((e) => e.dealId);
  }, [formik.values.dealIds]);

  const removeHandler = (arrayHelpers: any, index: any) => {
    let data = arrayHelpers?.form?.values?.dealIds?.find(
      (item: any, i: any) => i == index
    );
    const temp = [...removeDeals];
    temp?.push(data);
    setremoveDeals(temp);
    arrayHelpers.remove(index);
  };

  return (
    <>
      <FieldArray
        name="dealIds"
        render={(arrayHelpers) => (
          <div>
            {formik.values.dealIds?.map((name: string, index: number) => (
              <div key={index}>
                <Grid container spacing={3.5}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Deals<span className="asterisk">*</span>
                      </InputLabel>
                      <MagicDropDownWithId
                        name={`dealIds[${index}].dealId`}
                        option={dealList}
                        label="Deals"
                        formik={formik}
                        placeholder="Select Deals"
                        disabledOption={disabledDeal}
                        formikName={formik.values.dealIds[index]?.dealId}
                        error={
                          formik.errors?.dealIds
                            ? formik.errors?.dealIds[index]?.dealId
                            : ''
                        }
                        touched={
                          formik.touched?.dealIds
                            ? formik.touched?.dealIds[index]
                            : false
                        }
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>
                        Priority
                        <span className="asterisk">*</span>
                      </InputLabel>
                      <NormalTextField
                        name={`dealIds[${index}].priority`}
                        placeholder="Enter Priority"
                        // multiline={true}
                      />
                    </Stack>
                  </Grid>
                </Grid>
                {formik.values.dealIds.length > 0 && (
                  <Box mt={1} mb={2}>
                    {formik.values.dealIds.length === 1 ? (
                      ''
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: 1 }}
                        disabled={
                          permission === 'WRITE' || permission === 'FULL'
                            ? false
                            : true
                        }
                        // onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        onClick={() => removeHandler(arrayHelpers, index)} // remove a friend from the list
                      >
                        REMOVE
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mr: 1 }}
                      disabled={
                        permission === 'WRITE' || permission === 'FULL'
                          ? false
                          : true
                      }
                      onClick={() => arrayHelpers.push({ SlotArrayObj })} // insert an empty string at a position
                    >
                      ADD
                    </Button>
                  </Box>
                )}
              </div>
            ))}
          </div>
        )}
      />
      <FormHelperText sx={{ marginLeft: 1.75 }} error id="helper-text-country">
        {typeof formik.errors['dealIds'] === 'string' &&
          formik.errors['dealIds']}
      </FormHelperText>
    </>
  );
};

export default IncludesDeal;
