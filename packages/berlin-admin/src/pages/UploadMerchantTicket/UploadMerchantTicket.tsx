// material-ui
import {
  Breadcrumbs,
  Typography,
  InputLabel,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import DocUpload from './DocUpload';
import { FormikProvider, useFormik } from 'formik';
import {
  DocsPreviewBtn,
  MagicDateAndTimePicker,
  MagicDatePicker,
  MagicDropDown,
} from 'berlin-common';
import { useState, useEffect } from 'react';
import {
  addTicket,
  // getAllMerchantDeals,
  getDocsTable,
} from '../../services/uploadTicketService';
import * as yup from 'yup';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useDispatch } from 'react-redux';
import { TableRow } from '@mui/material';
import { HeadCell } from '../../types/table';
import moment from 'moment';
import Permission from '../../components/Permission';
import { useTranslation } from 'react-i18next';
import {
  getAllMerchantDealsTicket,
  merchantActiveList,
} from '../../services/dropDownService';
import usePermission from '../../components/Permission/usePermission';
import { FormHelperText } from '@mui/material';
import { getAllCodes } from '../../services/uploadExternalCodeService';
// ==============================|| MUI TABLE - HEADER ||============================== //

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function UploadMerchantTicket() {
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
  interface UploadTicketI {
    files: File[]; // Use File[] for multiple files or File | null for a single file
    deal_id: Dropdown | null;
    merchant_id: Dropdown | null;
    expiry_date: moment.Moment; // If using ISO strings
  }

  const headCells: HeadCell[] = [
    {
      id: 'expiry_date',
      numeric: false,
      disablePadding: true,
      label: 'Expiry Date ',
    },
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
    {
      id: 'link',
      numeric: false,
      disablePadding: true,
      label: 'Documents',
    },
  ];
  const dispatch = useDispatch();
  const [dense] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [merchantDropDown, setMerchantDropDown] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [code, setCode] = useState([]);
  const [dealDropDown, setDealDropDown] = useState([]);
  const [tableList, setTableList] = useState([]);
  const { t, i18n } = useTranslation('translation');
  const { permission } = usePermission('DEAL');
  const [allocatedCount, setAllocatedCount] = useState([]);
  const [summary, setSummary] = useState<any>({});
  const today = moment();
  const formik = useFormik({
    initialValues: {
      merchant_id: null,
      deal_id: null,
      expiry_date: today.add(180, 'days'),
      files: [],
    },
    validationSchema: yup.object({
      merchant_id: yup.mixed().required('Merchant is required'),
      deal_id: yup.mixed().required('Deal is required'),
      expiry_date: yup
        .date()
        .typeError('Expiry Date is required.Please select date')
        .required('Expiry Date is required'),
      files: yup
        .string()
        .typeError('Please upload at least 1 document.')
        .required('File is required'),
    }),

    onSubmit: async (value) => {
      handleAdd(value);
    },
  });
  const handleAdd = (value: UploadTicketI) => {
    const formData = new FormData();
    for (let i = 0; i < value.files?.length; i++) {
      formData.append('files', value.files[i]);
    }

    const deal: any = value.deal_id?.id || null;
    const merchant: any = value.merchant_id?.id || null;
    formData.append('deal_id', deal);
    formData.append('merchant_id', merchant);
    formData.append(
      'expiry_date',
      moment(value.expiry_date).format('YYYY-MM-DD')
    ); // Convert to ISO string if needed
    setBtnLoader(true);
    addTicket(formData)
      .then((_res) => {
        setBtnLoader(false);

        getLinksTable(formik.values.merchant_id?.id, formik.values.deal_id?.id);

        // formik.resetForm();
        setTableList(_res.data.data?.savedTickets);

        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: 'Upload merchant ticket created successfully',
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
      });
  };
  // Merchant  Dropdown
  const getMerchant = () => {
    merchantActiveList(i18n.language)
      .then((res) => {
        setMerchantDropDown(res.data.data.marchants);
        setLoading(true);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  //All Deals DropDown
  const getDeals = () => {
    let merchantId: any = formik.values.merchant_id;
    getAllMerchantDealsTicket(merchantId ? merchantId?.id : '')
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
  // Get Document List Table
  const getLinksTable = (merchantId, DealId) => {
    getDocsTable(merchantId, DealId)
      .then((res: any) => {
        setTableList(res?.data);
        setSummary(res?.summary);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (formik.values.merchant_id?.id && formik.values.deal_id?.id)
      getLinksTable(formik.values.merchant_id?.id, formik.values.deal_id?.id);
  }, [formik.values.merchant_id, formik.values.deal_id]);

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
    let allocated = tableList?.filter((item: any) => {
      return item.status == 'ALLOCATED';
    });
    setAllocatedCount(allocated);
  }, [tableList]);

  return (
    <>
      <MainCard title="Upload External Ticket">
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
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Expiry Date<span className="asterisk">*</span>
                  </InputLabel>

                  <MagicDatePicker
                    name="expiry_date"
                    formik={formik}
                    placeholder="End Date"
                    disablePast={true}
                    defaultValue={true}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>
                    Upload Document<span className="asterisk">*</span>
                  </InputLabel>
                  <FormHelperText id="standard-weight-helper-text-email-login">
                    {'Note:- Max Size - 10 MB Per File'}
                  </FormHelperText>
                  <DocUpload
                    accept={'application/pdf'}
                    multiSelect={true}
                    name={'files'}
                    formik={formik}
                  />
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
                      Total: {summary?.total ? summary?.total : '0'}
                    </InputLabel>
                    <InputLabel style={{ width: '140px' }}>
                      Allocated: {summary?.allocated ? summary?.allocated : '0'}
                    </InputLabel>
                    <InputLabel style={{ width: '140px' }}>
                      Open: {summary?.open ? summary?.open : '0'}
                    </InputLabel>
                  </Box>
                </Stack>
              </Grid>
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
                        {tableList.map((item) => {
                          return (
                            <>
                              <TableRow>
                                <TableCell>
                                  {moment(item.expiry_date).format(
                                    'DD-MM-YYYY'
                                  )}
                                </TableCell>
                                {/* <TableCell>{code}</TableCell> */}
                                {/* {code.map((item) => {
                                  return;
                                })} */}
                                <TableCell>{item?.code}</TableCell>
                                <TableCell>{item?.status}</TableCell>
                                <TableCell>
                                  <>
                                    {/* <p>{item?.filename}</p> */}
                                    {/* <a href={item?.url}>
                                    </a> */}
                                    <DocsPreviewBtn files={item} />
                                  </>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </MainCard>
    </>
  );
}
