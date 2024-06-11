import React, { useEffect, useState } from 'react';
import {
  Breadcrumbs,
  Grid,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Transitions from '../../../components/@extended/Transitions';
import MainCard from '../../../components/MainCard';
import { getOrderById } from '../../../services/purchaseServices';
import css from '../purchase.module.scss';
import { DateFormat } from 'berlin-common';
import { path } from '../../../routes/Routers';
// import { getPaymentLogById } from '../../../services/purchaseServices';

const orderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<any>();

  const getOrdersId = () => {
    getOrderById(id)
      .then((response) => {
        const result = response.data.data.order;
        const obj = { ...result };
        const voucherIds = result.vouchers.map((ele: any) => {
          if (ele.deal?.length > 0) {
            const dealName_en = ele.deal.find(
              (ele: any) =>
                ele.locale === 'en' &&
                (ele.table_name === 'deal' ||
                  ele.table_name === 'deal_bundle' ||
                  ele.table_name === 'deal_combo')
            );

            ele.deal_name = `${dealName_en?.text ?? ''} `;
          }
          return {
            voucherId: ele.voucherId,
            deal_type: ele.deal_type,
            price_type: ele.price_type,
            deal_name: ele.deal_name,
            deal_id: ele.deal_id,
            single_deal_name: ele?.single_deal_name,
          };
        });
        obj.voucherIds = voucherIds;
        setData(obj);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  useEffect(() => {
    if (id) {
      getOrdersId();
    }
  }, []);

  const vouchers = () => {
    return (
      <>
        {data?.voucherIds?.map(
          (
            item: {
              deal_name: string;
              deal_type: string;
              price_type: string;
              voucherId: number;
              deal_id: number;
              single_deal_name: string;
            },
            index: number
          ) => (
            <Link
              to={`/purchase/voucherlist/${item?.voucherId}`}
              target="_blank"
              className={css.voucherLink}
            >
              {item?.voucherId} - {item?.deal_type} -{' '}
              {item?.deal_type !== 'SINGLE'
                ? `${item?.single_deal_name} (${item?.deal_name})`
                : item?.deal_name}{' '}
              - {item?.deal_id}{' '}
              {item?.price_type
                ? item?.price_type != 'People' && `(${item?.price_type})`
                : ''}
              <br />
              {/* {arr.length - 1 !== index && ', '} */}
            </Link>
          )
        )}
      </>
    );
  };
  // const vouchers = () => {
  //   return (
  //     <>
  //       {data?.voucherIds?.map(
  //         (
  //           item: { deal_name: string; deal_type: string; voucherId: number },
  //           index: number
  //         ) => (
  //           <span
  //             key={index}
  //             className={css.voucherLink}
  //             onClick={() =>
  //               navigate(`/purchase/voucherlist/${item.voucherId}`)
  //             }
  //           >
  //             {item.voucherId} - {item.deal_type} - {item.deal_name}
  //             <br />
  //             {/* {arr.length - 1 !== index && ', '} */}
  //           </span>
  //         )
  //       )}
  //     </>
  //   );
  // };
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to={path.ORDERSLIST}>
          Order List
        </Link>
        <Typography color="text.primary">Order Details</Typography>
      </Breadcrumbs>

      <Grid mt={2} container>
        <Grid item>
          <MainCard title="Order Details">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Order ID/Number</Typography>
                  <Typography>
                    {data?.id != undefined &&
                      `${data?.id} / ${data?.order_number}`}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Customer Email</Typography>
                  <Typography className={css.voucherLink}>
                    <Link to={`/users/update/${data?.user_id}`} target="_blank">
                      {data?.user_email ? data?.user_email : '-'}
                    </Link>
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">User Platform</Typography>
                  <Typography>{data?.user_platform}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Payment Method</Typography>
                  <Typography>
                    {data?.payment_method ? data.payment_method : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Payment Status</Typography>
                  <Typography>{data?.payment_status}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">
                    Transaction Reference
                  </Typography>
                  <Typography>
                    {data?.transaction_reference
                      ? data?.transaction_reference
                      : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Voucher IDs</Typography>

                  <Typography>
                    {data?.vouchers?.length == 0 ? '-' : vouchers()}
                  </Typography>
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
                  <Typography color="secondary">Total Price</Typography>
                  <Typography>{data?.total_price}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary"> Total Payable</Typography>
                  <Typography>{data?.total_payable}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Total Paid</Typography>
                  <Typography>{data?.total_paid}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Date Created</Typography>
                  <Typography>{DateFormat(data?.created_at)}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary"> Date Paid</Typography>
                  <Typography>
                    {data?.date_paid ? DateFormat(data?.date_paid) : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Amount Refunded</Typography>
                  <Typography>
                    {data?.amount_refunded ? data?.amount_refunded : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary">Date Cancelled</Typography>

                  <Typography>
                    {data?.revoked_date_time
                      ? DateFormat(data?.revoked_date_time)
                      : '-'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={0.5}>
                  <Typography color="secondary"> Cancelled By</Typography>

                  <Typography>
                    {data?.revoked_by ? (
                      <>
                        {data?.revoked_by?.first_name}
                        {data?.revoked_by?.last_name}
                      </>
                    ) : (
                      '-'
                    )}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default orderDetails;
