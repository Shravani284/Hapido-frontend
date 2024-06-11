// material-ui
import {
  Breadcrumbs,
  Typography,
  InputLabel,
  Button,
  Card,
  Box,
  TableHead,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';

import { useState, useEffect } from 'react';
import * as yup from 'yup';
import {
  addExternalCode,
  getAllCodes,
} from '../../services/uploadExternalCodeService';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../../store/slice/Loader';
import Permission from '../../components/Permission';
import { CircularProgress } from '@mui/material';
import {
  getAllMerchantDealsCode,
  merchantActiveList,
} from '../../services/dropDownService';
import usePermission from '../../components/Permission/usePermission';
import { useTranslation } from 'react-i18next';
import { TableContainer } from '@mui/material';
import { Table } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableBody } from '@mui/material';
import moment from 'moment';
import { HeadCell } from '../../types/table';
// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function UploadExternalCode() {
  interface IDeal {
    id: number;
    translations: Translation[];
    deal_type?: any;
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
    codes: string;
  }

  const headCells: HeadCell[] = [
    // {
    //   id: 'expiry_date',
    //   numeric: false,
    //   disablePadding: true,
    //   label: 'Expiry Date ',
    // },
    {
      id: 'code',
      numeric: false,
      disablePadding: true,
      label: 'Code',
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: true,
      label: 'Status',
    },
    // {
    //   id: 'link',
    //   numeric: false,
    //   disablePadding: true,
    //   label: 'Documents',
    // },
  ];
  const dispatch = useDispatch();
  const [merchantDropDown, setMerchantDropDown] = useState([]);
  const [dealDropDown, setDealDropDown] = useState([]);
  const { permission } = usePermission('DEAL');
  const [btnLoader, setBtnLoader] = useState(false);
  const { t, i18n } = useTranslation('translation');
  const [dense] = useState(false);
  const [allocatedCount, setAllocatedCount] = useState([]);
  const [code, setCode] = useState([]);

  console.log('allocatedCount', allocatedCount?.length);

  const formik = useFormik({
    initialValues: {
      codes: '',
      merchant_id: null,
      deal_id: null,
    },
    validationSchema: yup.object({
      merchant_id: yup.mixed().required('Merchant is required'),
      deal_id: yup.mixed().required('Deal is required'),
      codes: yup.string().required('External code is required'),
    }),
    onSubmit: async (value) => {
      handleAdd(value);
    },
  });
  const handleAdd = (value: UploadCodeI) => {
    const oldCode = code.map((e) => e.code);
    const allCode = [...oldCode, ...value?.codes?.split(',')]?.map(
      (e) => e?.replace(/\n/g, '')
    );
    const payLoad = {
      codes: allCode,
      merchant_id: value.merchant_id?.id,
      deal_id: value.deal_id?.id,
    };
    setBtnLoader(true);
    addExternalCode(payLoad)
      .then((_res) => {
        setBtnLoader(false);
        // formik.resetForm();
        allcodes();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'External code created successfully',
            varient: 'success',
          })
        );
      })
      .catch((error) => {
        setBtnLoader(false);
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message.code
              ? error.response.data.error.message.code
              : error.response.data.error.message,
            varient: 'error',
          })
        );
        console.log(error);
      });
  };
  // Merchant  Dropdown
  const getMerchant = () => {
    merchantActiveList(i18n.language)
      .then((res) => {
        setMerchantDropDown(res?.data?.data?.marchants);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  //All Deals DropDown
  const getDeals = () => {
    let merchantId: any = formik.values.merchant_id;
    getAllMerchantDealsCode(merchantId ? merchantId?.id : '')
      .then((res: any) => {
        if (res?.success == true) {
          if (merchantId) {
            setDealDropDown(res?.data?.deals);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Get All Codes
  const allcodes = () => {
    let dealId: any = formik.values.deal_id;
    let merchantId: any = formik.values.merchant_id;

    getAllCodes(merchantId ? merchantId?.id : '', dealId ? dealId?.id : '')
      .then((res) => {
        formik.setFieldValue('codes', '');
        // setCode(res.data.data.codes?.map((e) => e.code));
        setCode(res.data.data.codes);
      })
      .catch((error) => {
        console.log(error);
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

  useEffect(() => {
    allcodes();
  }, [formik?.values?.deal_id]);

  useEffect(() => {
    let allocated = code?.filter((item: any) => {
      return item.status == 'ALLOCATED';
    });
    setAllocatedCount(allocated);
  }, [code]);

  return (
    <>
      <MainCard title="Upload External Code">
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
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel>
                    External Code<span className="asterisk">*</span>
                  </InputLabel>
                  <NormalTextField
                    name="codes"
                    placeholder="Enter External Code"
                    multiline={true}
                    rows={5}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  <InputLabel style={{ fontWeight: 'bold', color: 'black' }}>
                    Summary:
                  </InputLabel>
                  <Box
                    display={'flex'}
                    justifyContent={'start'}
                    style={{ padding: '8px' }}
                  >
                    <InputLabel style={{ width: '140px' }}>
                      Total: {code ? code?.length : '0'}
                    </InputLabel>
                    <InputLabel style={{ width: '140px' }}>
                      Allocated: {allocatedCount ? allocatedCount?.length : '0'}
                    </InputLabel>
                    <InputLabel style={{ width: '140px' }}>
                      Open: {code ? code?.length - allocatedCount?.length : '0'}
                    </InputLabel>
                  </Box>
                </Stack>
              </Grid>
              {/* ------------- */}
              <Grid item xs={12} sm={12} mt={1}>
                <Stack spacing={1}>
                  <TableContainer>
                    <Table
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? 'small' : 'medium'}
                    >
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.numeric ? 'right' : 'left'}
                              padding={
                                headCell.disablePadding ? 'none' : 'normal'
                              }
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {code.map((item) => {
                          return (
                            <>
                              <TableRow>
                                <TableCell>{item?.code}</TableCell>
                                <TableCell>{item?.status}</TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>
              {/* <Grid item xs={12} sm={12}>
                <Stack spacing={1}>
                  {code.length > 0 && <InputLabel>Previous Code</InputLabel>}
                  <Box display={'flex'} gap={2} flexWrap={'wrap'}>
                    {code.map((e) => (
                      <Card sx={{ padding: 1 }}>{e.code}</Card>
                    ))}
                  </Box>
                </Stack>
              </Grid> */}

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
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={btnLoader}
                    >
                      {btnLoader ? (
                        <CircularProgress
                          color="secondary"
                          style={{ margin: '3px 10px' }}
                          size={18}
                        />
                      ) : (
                        'Submit'
                      )}
                    </Button>
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
