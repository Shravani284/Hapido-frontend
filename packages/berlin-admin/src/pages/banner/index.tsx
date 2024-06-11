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
  Button,
  Collapse,
  Box,
  Breadcrumbs,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { paginationOption } from 'berlin-common';
import { getUserByIdAPI } from '../../services/userService';
import { path } from '../../routes/Routers';
import { bannerPlacementList } from '../../services/bannerService';
import IconButton from '../../components/@extended/IconButton';
import { EditOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { t } from 'i18next';
import Permission from '../../components/Permission';
import usePermission from '../../components/Permission/usePermission';
import { useDispatch, useSelector } from 'react-redux';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'Placement_Location',
    numeric: false,
    disablePadding: true,
    label: 'Placement Location',
  },
  {
    id: 'placement_title',
    numeric: false,
    disablePadding: true,
    label: 'Placement Title',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'ACTION',
  },
];

export default function handleBannerPlacementList() {
  const { permission } = usePermission('BANNER');
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();
  const pagenationDetails = useSelector((state: any) => state?.pagination);

  const navigate = useNavigate();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    dispatch(pageHandler(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    dispatch(pageHandler(0));
    dispatch(rowPageHandler(parseInt(event?.target.value!, 10)));
  };

  const handleBannerPlacement = () => {
    return path.UPLOADBANNER;
  };
  useEffect(() => {
    bannerPlacementList(pagenationDetails?.page, pagenationDetails?.rowsPerPage)
      .then((res) => {
        setRows(res.data.data.placements);
        setTotalCount(res.data.data.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pagenationDetails?.page, pagenationDetails?.rowsPerPage]);

  return (
    <>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          marginBottom={'20px'}
        >
          {(permission === 'WRITE' || permission === 'FULL') && (
            <Link className="addBtn" to={handleBannerPlacement()}>
              {/* // <Button
            //   variant="contained"
            //   size="large"
            //   type="submit"
            //   onClick={handleBannerPlacement}
            // > */}
              Add Banner Placement
              {/* // </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>
      <MainCard content={false} title="Banner Placement">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                {headCells?.map((headCell) => (
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
              {rows?.map((row: any) => {
                return <Row key={row.id} row={row} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <TablePagination
          rowsPerPageOptions={paginationOption}
          component="div"
          count={totalCount}
          rowsPerPage={pagenationDetails?.rowsPerPage}
          page={pagenationDetails?.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
}

function Row({ row }: any) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open === true) {
      getUserByIdAPI(row.id)
        .then((res) => {
          setData(res.data.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [open]);
  const updateBannerById = (id: any) => {
    return `/banner/bannerplacelist/update/${id}`;
  };

  return (
    <>
      <TableRow hover tabIndex={-1} key={row.id} onClick={() => setOpen(!open)}>
        <TableCell>{row?.placement_location}</TableCell>
        <TableCell>{row?.placement_title}</TableCell>
        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateBannerById(row.id)}>
              <IconButton
                title={t('EDIT')}
                variant="light"
                color="info"
                // onClick={() => updateBannerById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {/* <IconButton variant="light" onClick={() => deleteBanner(row)}>
              <DeleteOutlined />
            </IconButton> */}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
