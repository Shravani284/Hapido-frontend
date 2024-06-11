import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { HeadCell } from '../../../types/table';
import { getDealSales } from '../../../services/purchaseServices';
import MaterialTable from 'material-table';
import {
  formatDateInDubaiTimeZone,
  tableIcons,
  timeFormat,
} from 'berlin-common';
import moment from 'moment';
import Filter from './filter';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { filterRememberValueHandler } from '../../../store/slice/Filter';
import { pageHandler } from '../../../store/slice/Pagination';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { DatePaidFormat } from 'berlin-common/src/components/DateFormat';

// function formatUTCDate(dateString) {
//   return new Date(dateString).toLocaleDateString('en-US');
// }
const DealSales = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [filterPayload, setFilterPayload] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      paidStartDate: null,
      paidEndDate: null,
    },
    onSubmit: async (value) => {
      dispatch(filterRememberValueHandler(value));
      setFilterPayload(value);
      dispatch(pageHandler(0));
      setFilterOpen(false);
      getDealSalesList();
    },
  });
  const getDealSalesList = () => {
    setLoading(true);
    getDealSales(formik.values?.paidStartDate, formik.values?.paidEndDate)
      .then((response) => {
        const data = response?.data?.data?.result.map((e) => {
          return {
            ...e,
            'date(o.date_paid)': moment(e['date(o.date_paid)'])
              .utc()
              .format('DD MMM YYYY'),
            // deal_individual_price: +e.deal_individual_price,
            // deal_total_price: +e.deal_total_price,
            voucher_released: parseInt(e.voucher_released),
            voucher_remaining: parseInt(e.voucher_remaining),
            deal_name:
              e.price_type === 'People'
                ? e.deal_name
                : `${e.deal_name} - ${e.price_type}`,
          };
        });
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getDealSalesList();
  }, []);

  // const formattedRows = rows.map((row) => {
  //   const formattedRow = { ...row };
  //   headCells.forEach((headCell) => {
  //     if (headCell.id === 'date(o.date_paid)') {
  //       formattedRow[headCell.id.replace(/[^\w\s]/gi, '')] = formatUTCDate(
  //         row[headCell.id]
  //       );
  //     } else {
  //       formattedRow[headCell.id.replace(/[^\w\s]/gi, '')] = row[headCell.id];
  //     }
  //   });
  //   return formattedRow;
  // });
  const columns: any = [
    {
      title: 'Order ID',
      field: 'order_id',
      width: '100px',
    },
    {
      title: 'PAID DATE (GMT+0)',
      field: 'date(o.date_paid)',
      width: '150px',
      // render: (rows) => {
      //   return moment(rows['date(o.date_paid)']).utc().format('DD MMM YYYY');
      // },
    },
    {
      title: 'DEAL PRICE',
      field: 'deal_individual_price',
      width: 'auto',
      customSort: (a, b) => {
        const numA = parseFloat(a.deal_individual_price);
        const numB = parseFloat(b.deal_individual_price);
        return numA - numB;
      },
    },
    {
      title: 'QTY',
      field: 'quantity',
      width: 'auto',
    },
    {
      title: 'TOTAL PRICE',
      field: 'deal_total_price',
      width: 'auto',
      customSort: (a, b) => {
        const numA = parseFloat(a.deal_total_price);
        const numB = parseFloat(b.deal_total_price);
        return numA - numB;
      },
    },
    {
      title: 'TOTAL PAID',
      field: 'deal_paid_price',
      width: 'auto',
      customSort: (a, b) => {
        const numA = parseFloat(a.deal_paid_price);
        const numB = parseFloat(b.deal_paid_price);
        return numA - numB;
      },
    },
    {
      title: 'VOUCHER RELEASED',
      field: 'voucher_released',
      width: 'auto',
    },
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
      title: 'VOUCHER REMAINING',
      field: 'voucher_remaining',
      width: 'auto',
    },
    {
      title: 'CARD NO',
      field: 'card_number',
      width: 'auto',
    },
  ];
  return (
    <div>
      <Grid className="dataTable" mt={2} item xs={12}>
        <>
          <Box
            sx={{
              minWidth: 120,
              // top: '-20px',
              // right: '11px',
              textAlign: 'end',
            }}
            mb={2}
          >
            <Button variant="outlined" onClick={() => setFilterOpen(true)}>
              Filter by <FilterAltOutlinedIcon />
            </Button>
            <Filter
              formik={formik}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
            />
          </Box>

          <MaterialTable
            icons={tableIcons}
            title={<span style={{ fontWeight: 'bold' }}>Deal Sales</span>}
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
              // filtering: true,
              exportButton: true,
              exportAllData: true,
              exportFileName: 'Deal Sales',
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

export default DealSales;
