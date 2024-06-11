// material-ui
import {
  Breadcrumbs,
  Typography,
  InputLabel,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { MagicDropDown } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import { merchantDropDownApi } from '../../services/dealsService';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { path } from '../../routes/Routers';
import {
  getAllInventoryMerchantDeals,
  merchantActiveList,
} from '../../services/dropDownService';
import { useTranslation } from 'react-i18next';
import usePermission from '../../components/Permission/usePermission';
// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function UploadExternalCode() {
  interface IDeal {
    id: number;
    label: string;
    deal_bundle_id: number;
    deal_type: string;
    deal_active_date: string;
    deal_end_date: string;
  }
  interface Dropdown {
    id: number | string;
    label: string;
  }

  interface Translation {
    id: number;
    locale: string;
    link_id: number;
    table_name: string;
    column_name: string;
    text: string;
  }
  interface UploadCodeI {
    deal_id: Dropdown | null;
    merchant_id: Dropdown | null;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { permission } = usePermission('MANUAL_BOOKING');

  const [merchantDropDown, setMerchantDropDown] = useState([]);
  const [dealDropDown, setDealDropDown] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { t, i18n } = useTranslation('translation');

  const formik = useFormik({
    initialValues: {
      merchant_id: null,
      deal_id: null,
      deal_type: '',
      deal_active_date: '',
      deal_end_date: '',
    },
    validationSchema: yup.object({
      deal_id: yup.mixed().required('Deal is required'),
    }),
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });
  const handleAdd = async (value: UploadCodeI) => {
    const deal: any = formik.values.deal_id;

    navigate(path.INVENTORYASSIGNMENTSLOTS, {
      state: {
        deal: deal,
      },
    });
  };

  const getMerchant = () => {
    merchantActiveList(i18n.language)
      .then((response) => {
        setMerchantDropDown(response.data.data.marchants);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //All Deals DropDown
  const getDeals = () => {
    let merchantId: any = formik.values.merchant_id;
    setLoading(true);
    getAllInventoryMerchantDeals(merchantId ? merchantId?.id : '')
      .then((res: any) => {
        if (res?.success == true) {
          const data = res.data?.deals.map((e: IDeal) => {
            return {
              label: e.deal_type === 'Bundle' ? 'BUNDLE- ' + e.label : e.label,
              id: e.id,
              dealBundleId: e.deal_type === 'Bundle' ? e.id : null,
              deal_type: e.deal_type,
              deal_active_date: e.deal_active_date,
              deal_end_date: e.deal_end_date,
            };
          });
          if (merchantId) {
            setDealDropDown(data);
          }
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getMerchant();
  }, []);
  useEffect(() => {
    if (formik.values.merchant_id) {
      formik.setFieldValue('deal_id', null);
      getDeals();
    }
  }, [formik.values.merchant_id]);

  return (
    <>
      <MainCard title="Inventory Assignment">
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3.5}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Merchant<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="merchant_id"
                    option={merchantDropDown}
                    label="Merchant"
                    formik={formik}
                    placeholder="Select Merchant"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Deal<span className="asterisk">*</span>
                  </InputLabel>
                  <MagicDropDown
                    name="deal_id"
                    option={dealDropDown}
                    label="deal"
                    formik={formik}
                    placeholder="Select Deal"
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
              </Grid>

              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="right"
                  spacing={2}
                  mr={2}
                  mb={2}
                >
                  {(permission === 'WRITE' || permission === 'FULL') && (
                    <>
                      <Button variant="contained" type="submit">
                        Submit
                      </Button>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
}
