import React, { useEffect, useState } from 'react';

// material-ui
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Collapse,
  Box,
  Breadcrumbs,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { DateFormat, paginationOption } from 'berlin-common';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import useConfig from '../../hooks/useConfig';
import { dealsBundleList } from '../../services/dealsBundlesService';
import { MenuItem } from '@mui/material';

const headCells: HeadCell[] = [
  {
    id: 'icon',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'deal_bundle_id',
    numeric: false,
    disablePadding: true,
    label: 'Bundle',
  },
  {
    id: 'slug',
    numeric: false,
    disablePadding: true,
    label: 'Slug',
  },
  {
    id: 'display_selling_price',
    numeric: false,
    disablePadding: true,
    label: 'Selling Price',
  },
  {
    id: 'display_old_price',
    numeric: false,
    disablePadding: true,
    label: 'Old Price',
  },
  {
    id: 'primary_category_id',
    numeric: false,
    disablePadding: true,
    label: 'Primary Category',
  },
  {
    id: 'secondary_category_ids',
    numeric: false,
    disablePadding: true,
    label: 'Secondary Category',
  },
  {
    id: 'currency',
    numeric: false,
    disablePadding: true,
    label: 'Currency',
  },
  {
    id: 'show_timer',
    numeric: false,
    disablePadding: true,
    label: 'Show Timer',
  },
  {
    id: 'show_old_price',
    numeric: false,
    disablePadding: true,
    label: 'Show Old Price',
  },
  {
    id: 'initial_bought_count',
    numeric: false,
    disablePadding: true,
    label: 'Bought Count',
  },
  {
    id: 'sold_out',
    numeric: false,
    disablePadding: true,
    label: 'Sold Out',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: true,
    label: 'Priority',
  },
  {
    id: 'deal_active_date',
    numeric: false,
    disablePadding: true,
    label: 'Active Date',
  },
  {
    id: 'deal_end_date',
    numeric: false,
    disablePadding: true,
    label: 'End Date',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function DealBundles() {
  const handleChange = (event: SelectChangeEvent) => {
    setStatusDealB(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    setRowsPerPage(parseInt(event?.target.value!, 10));
    setPage(0);
  };
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { i18n } = useConfig();
  const [statusDealB, setStatusDealB] = React.useState('active');

  const getAllDealBundle = () => {
    setLoading(true);
    dealsBundleList(page, rowsPerPage, i18n, statusDealB)
      .then((res) => {
        if (res?.status) {
          const getAllDealBundleList = res.data.data.dealBundles?.map(
            (item: any) => {
              const obj = { ...item };
              if (item.translations.length > 0) {
                const title_en = item.translations.find(
                  (ele: any) =>
                    ele.locale === 'en' && ele.column_name === 'title_trans_ids'
                );
                const title_ar = item.translations.find(
                  (ele: any) =>
                    ele.locale === 'ar' && ele.column_name === 'title_trans_ids'
                );

                obj.title = `${title_en?.text ?? ''} ${title_ar?.text ?? ''}`;
              }
              return obj;
            }
          );

          setRows(getAllDealBundleList);

          setTotalCount(res.data.data.totalCount);

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllDealBundle();
  }, [page, rowsPerPage, statusDealB]);

  return (
    <>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          marginBottom={'20px'}
        ></Stack>
      </Grid>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Typography color="text.primary">Deals Boundles</Typography>{' '}
      </Breadcrumbs>
      <MainCard content={false} title="Boundle Deal List">
        <Box
          sx={{
            minWidth: 120,
            position: 'absolute',
            top: '13px',
            right: '11px',
          }}
        >
          <FormControl sx={{ minWidth: '120px' }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusDealB}
              label={statusDealB}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => {
                return <Row row={row} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        {/* table data */}
        <TablePagination
          rowsPerPageOptions={paginationOption}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
}

function Row({ row = [] }: any) {
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const data: any = {};
  row?.translations?.forEach((item: any) => {
    const columnName = item.column_name;
    const text = item.text;

    if (data[columnName]) {
      data[columnName] += ` ${text}`;
    } else {
      data[columnName] = text;
    }
  });

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id}>
        <TableCell onClick={() => setOpen(!open)}>
          {!open ? <RightOutlined /> : <DownOutlined />}
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row?.deal_bundle_id}</TableCell>
        <TableCell>{row.slug}</TableCell>
        <TableCell>{row.display_selling_price}</TableCell>
        <TableCell>{row.display_old_price}</TableCell>
        <TableCell>{row.primary_category_id}</TableCell>
        <TableCell>{row.secondary_category_ids}</TableCell>
        <TableCell>{row.currency}</TableCell>
        <TableCell>{row.show_timer}</TableCell>
        <TableCell>{row.show_old_price}</TableCell>
        <TableCell>{row.initial_bought_count}</TableCell>
        <TableCell>{row?.sold_out}</TableCell>
        <TableCell>{row.priority}</TableCell>
        <TableCell>{DateFormat(row.deal_active_date)}</TableCell>
        <TableCell>{DateFormat(row.deal_end_date)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={17}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ width: '100%' }}
          >
            {open && (
              <Box
                sx={{
                  py: 3,
                  pl: { xs: 3, sm: 5, md: 6, lg: 10, xl: 12 },
                }}
              >
                {/* <MainCard content={false}> */}
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title Trans</TableCell>
                      <TableCell>Tagline Trans</TableCell>
                      <TableCell>Description Table</TableCell>
                      <TableCell>Slug</TableCell>
                      <TableCell>Deal Type</TableCell>
                      <TableCell>Deal Group</TableCell>
                      <TableCell>Deal Bundle</TableCell>
                      <TableCell>Selling Price</TableCell>
                      <TableCell>Old Price</TableCell>
                      <TableCell>Inventory Variable Pricing</TableCell>
                      <TableCell>Type Variable Pricing</TableCell>
                      <TableCell>Location Specific</TableCell>
                      <TableCell>Slot Enabled</TableCell>
                      <TableCell>Allocation Days Count</TableCell>
                      <TableCell align="right">Active</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.title_trans_ids}</TableCell>
                      <TableCell>{row.tagline_trans_ids}</TableCell>
                      <TableCell>{row.description_table_ids}</TableCell>
                      <TableCell>{row.slug}</TableCell>
                      <TableCell>{row.deal_type}</TableCell>
                      <TableCell>{row.deal_group_id}</TableCell>
                      <TableCell>{row.deal_bundle_id}</TableCell>
                      <TableCell>{row.selling_price}</TableCell>
                      <TableCell>{row.old_price}</TableCell>
                      <TableCell>{row.is_inventory_variable_pricing}</TableCell>
                      <TableCell>{row.is_type_variable_pricing}</TableCell>
                      <TableCell>{row.is_location_specific}</TableCell>
                      <TableCell>{row.is_slot_enabled}</TableCell>
                      <TableCell>
                        {row.slot_allow_allocation_days_count}
                      </TableCell>

                      <TableCell align="right">
                        {row.active ? 'Active' : 'Inactive'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
