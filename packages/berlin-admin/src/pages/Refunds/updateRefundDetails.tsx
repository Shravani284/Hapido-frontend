import { Breadcrumbs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCard from '../../components/MainCard';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { InputLabel } from '@mui/material';
import { MagicDropDown, NormalTextField } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { getRefundDetails, updateRefund } from '../../services/refundService';
import { refundStatus } from '../../data/data';
import { setDropDownValues } from '../../utils/dropDown';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import css from '../Purchase/purchase.module.scss';
import { path } from '../../routes/Routers';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';

const updateRefundDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const [refund_status, setRefundStatus] = useState<any>();
  const [refundData, setRefundData] = useState<any>();
  const { permission } = usePermission('REFUND');

  const formik = useFormik({
    initialValues: {
      voucher_id: '',
      order_id: '',
      refund_amount: '',
      refund_status: [],
    },
    validationSchema: yup.object({
      voucher_id: yup.string().required('Voucher Id is required'),
      order_id: yup.string().required('Order Id is required'),
      refund_amount: yup.string().required('Refund Amount is required'),
      refund_status: yup.object().required('Refund Status is required'),
    }),

    onSubmit: async (value: any) => {
      const response = value;
      const payLoad = {
        voucher_id: response?.voucher_id,
        order_id: response?.order_id,
        refund_amount: response?.refund_amount,
        refund_status: response?.refund_status?.id,
      };
    },
  });
  const getRefundById = (id: any) => {
    getRefundDetails(id).then((response) => {
      const result = response.data.data.refundDetail;

      const obj = { ...result };

      if (obj.merchant.translations.length > 0) {
        const title_en = obj.merchant.translations.find(
          (ele: any) => ele.locale === 'en' && ele.table_name === 'merchant'
        );
        const title_ar = obj.merchant.translations.find(
          (ele: any) => ele.locale === 'ar' && ele.table_name === 'merchant'
        );

        obj.merchant_name = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
      }

      if (obj.deal.dealName.length > 0) {
        const title_en = obj.deal.dealName.find(
          (ele: any) =>
            ele.locale === 'en' && ele.column_name === 'title_trans_ids'
        );
        const title_ar = obj.deal.dealName.find(
          (ele: any) =>
            ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
        );

        obj.deal_Name = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
      }
      setData(obj);
    });
  };

  useEffect(() => {
    getRefundById(id);
  }, []);

  const handleDeals = (deal_type: any, deal_id: any) => {
    if (deal_type == 'SINGLE') {
      navigate(`/deals/singledeals/update/${deal_id}`);
    } else if (deal_type == 'BUNDLE') {
      navigate(`/deals/dealbundle/update/${deal_id}`);
    } else if (deal_type == 'COMBO') {
      navigate(`/deals/dealcombo/update/${deal_id}`);
    }
  };

  const handleRefundStatus = (status: string) => {
    const payLoad = {
      id: data?.id,
      voucher_id: data?.voucher_id,
      order_id: data?.order_id,
      refund_amount: data?.refund_amount,
      refund_status: status,
    };

    updateRefund(payLoad)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.REFUNDSLIST}>
          Refunds List
        </Link>
        <Typography color="text.primary">Update Refund</Typography>
      </Breadcrumbs>

      <Grid container mt={2} xl={12}>
        <Grid item>
          <MainCard title="Voucher Details">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher Id</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/purchase/voucherlist/${data.voucher_id}`)
                    }
                  >
                    {data?.voucher_id}-{data?.deal_Name}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Order Id</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/purchase/orderslist/${data.order_id}`)
                    }
                  >
                    {/* {data?.order_id}/ order_number */}
                    {data?.order_id != undefined &&
                      `${data?.order_id} / ${data?.order_number}`}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Customer Name/Email</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/users/update/${data?.customer.id}`)
                    }
                  >
                    {data?.customer.first_name != undefined &&
                      `${data?.customer.first_name} ${data?.customer.last_name} / ${data?.customer.email}`}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Deal Type</Typography>
                  <Typography>{data?.deal_type}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Deal Name</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() => handleDeals(data?.deal_type, data?.deal.id)}
                  >
                    {data?.deal_Name} {data?.deal.id}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Merchant Name</Typography>
                  <Typography
                    className={css.voucherLink}
                    onClick={() =>
                      navigate(`/merchant/update/${data?.merchant.id}`)
                    }
                  >
                    {data?.merchant_name}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Payment Method </Typography>
                  <Typography>{data?.payment_method}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Transaction Reference
                  </Typography>
                  <Typography>{data?.transaction_reference}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Currency</Typography>
                  <Typography>{data?.currency}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Price</Typography>
                  <Typography>{data?.price}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Coupon Discount</Typography>
                  <Typography>{data?.coupon_discount}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Refund Eligible Amount
                  </Typography>
                  <Typography>{data?.refund_eligible_amount}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Refund Requested Amount
                  </Typography>
                  <Typography>{data?.refund_amount}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Refund Status</Typography>
                  <Typography>
                    {data?.refund_status === 'REQUESTED_REFUND'
                      ? 'REQUESTED REFUND'
                      : data?.refund_status}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Refunded by </Typography>
                  <Typography>
                    {data?.refund_status === 'REQUESTED_REFUND'
                      ? '--'
                      : data?.refundedBy.first_name}
                    {/* {data?.refundedBy.first_name} {data?.refundedBy.last_name} */}
                  </Typography>
                </Stack>
              </Grid>

              {/* Select Action */}
              {/* {permission === 'FULL' && ( */}
              {(permission === 'WRITE' || permission === 'FULL') && (
                <>
                  {data?.refund_status === 'REQUESTED_REFUND' ? (
                    <Grid item xs={12} md={6}>
                      <Typography color="secondary">Select Action </Typography>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={2}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          type="submit"
                          onClick={() => handleRefundStatus('REFUNDED')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{ mt: 1, mr: 1 }}
                          onClick={() => handleRefundStatus('REJECTED')}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </Grid>
                  ) : (
                    ' '
                  )}
                </>
              )}
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default updateRefundDetails;
