import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { getActiveDeals } from '../../../services/purchaseServices';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { tableIcons } from 'berlin-common';

const ActiveDeals = () => {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getDealSalesList = () => {
    setLoading(true);
    getActiveDeals()
      .then((response) => {
        const data = response?.data?.data?.result.map((e) => {
          return {
            ...e,
            voucher_sold: +e.voucher_sold,
            voucher_remaining: +e.voucher_remaining,
            least_expiry_date:
              e.least_expiry_date == null ? '-' : e.least_expiry_date,
            // commission: parseInt(e.commission),
          };
        });
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getDealSalesList();
  }, []);

  const columns: any = [
    {
      title: 'DEAL ID',
      field: 'deal_id',
      width: 'auto',
    },
    {
      title: 'DEAL NAME',
      field: 'deal_name',
      cellStyle: {
        width: '400px',
      },
    },
    {
      title: 'MERCHANT ID',
      field: 'merchant_id',
      width: 'auto',
    },
    {
      title: 'MERCHANT NAME',
      field: 'merchant_name',
      width: 'auto',
    },
    {
      title: 'SELLING PRICE',
      field: 'selling_price',
      width: 'auto',
    },
    {
      title: 'COMMISSION',
      field: 'commission',
      width: 'auto',
      customSort: (a, b) => {
        const numA = parseFloat(a.commission);
        const numB = parseFloat(b.commission);
        return numA - numB;
      },
    },
    {
      title: 'Net Payout / Purchase',
      field: 'net_payout',
      width: 'auto',
      customSort: (a, b) => {
        const numA = parseFloat(a.net_payout);
        const numB = parseFloat(b.net_payout);
        return numA - numB;
      },
    },
    {
      title: 'DEAL TYPE',
      field: 'deal_type',
      width: 'auto',
    },
    {
      title: 'VOUCHER TYPE',
      field: 'voucher_type',
      width: 'auto',
    },
    {
      title: 'ISSUED BY',
      field: 'issued_by',
      width: 'auto',
    },
    {
      title: 'VOUCHER SOLD',
      field: 'voucher_sold',
      width: 'auto',
    },
    {
      title: 'VOUCHER REMAINING',
      field: 'voucher_remaining',
      width: 'auto',
    },
    {
      title: 'LEAST EXPIRY DATE',
      field: 'least_expiry_date',
      width: 'auto',
    },
  ];

  return (
    <div>
      <Grid className="dataTable" mt={2} item xs={12}>
        <>
          <MaterialTable
            icons={tableIcons}
            title={<span style={{ fontWeight: 'bold' }}>Active Deals</span>}
            columns={columns}
            data={rows}
            localization={{
              body: {
                emptyDataSourceMessage:
                  loading == true
                    ? 'Loading data ...'
                    : 'No records to display',
              },
            }}
            options={{
              exportButton: true,
              exportAllData: true,
              exportFileName: 'Active Deals',
              sorting: true,
              headerStyle: {
                backgroundColor: '#f5f5f5',
                fontWeight: 600,
              },
              showFirstLastPageButtons: false,
              pageSize: 10,
              pageSizeOptions: [5, 10, 25],
              paginationType: 'stepped',
              tableLayout: 'auto',
            }}
          />
        </>
      </Grid>
    </div>
  );
};

export default ActiveDeals;
