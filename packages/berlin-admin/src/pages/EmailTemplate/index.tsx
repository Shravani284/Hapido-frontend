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
  Box,
  Breadcrumbs,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { HeadCell } from '../../../../berlin-merchant/src/types/table';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import MainCard from '../../components/MainCard';
import { ConfirmBoxAlert, paginationOption } from 'berlin-common';
import IconButton from '../../components/@extended/IconButton';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import {
  getEmailTemplateAll,
  templateDelete,
} from '../../services/emailTemplateService';
import { path } from '../../routes/Routers';
import usePermission from '../../components/Permission/usePermission';
import { useDispatch, useSelector } from 'react-redux';
import { pageHandler, rowPageHandler } from '../../store/slice/Pagination';

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'lang',
    numeric: false,
    disablePadding: false,
    label: 'Language',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },

  // {
  //   id: 'text_part',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Text Part',
  // },
  // {
  //   id: 'html_part',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Html Part',
  // },
  {
    id: 'active',
    numeric: false,
    disablePadding: false,
    label: 'Active',
  },
  {
    id: '',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

// ==============================|| TABLE - DATA TABLE ||============================== //

export default function Mearchant() {
  const { permission } = usePermission('EMAIL_TEMPLATE');

  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePayLoad, setDeletePayLoad] = useState('');
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

  const handleEmailTemplate = () => {
    return path.EMAILTEMPLATEFORM;
  };
  const getEmailTemplate = () => {
    getEmailTemplateAll(pagenationDetails?.page, pagenationDetails?.rowsPerPage)
      .then((res) => {
        setRows(res.data.data.templates);
        setTotalCount(res.data.data.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };

  const getTemplateDelete = () => {
    templateDelete(deletePayLoad)
      .then((res) => {
        getEmailTemplate();
        setModalOpen(false);
      })
      .catch((error) => {});
    setModalOpen(false);
  };

  useEffect(() => {
    getEmailTemplate();
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
            <Link className="addBtn" to={handleEmailTemplate()}>
              {/* <Button
                variant="contained"
                size="large"
                type="submit"
                onClick={handleEmailTemplate}
              > */}
              Add Email Template
              {/* </Button> */}
            </Link>
          )}
        </Stack>
      </Grid>

      <MainCard content={false} title="Email Template List">
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
                return (
                  <Row
                    key={row.id}
                    row={row}
                    deleteItem={deleteItem}
                    permission={permission}
                  />
                );
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
      <ConfirmBoxAlert
        title={'Delete'}
        handleClose={() => setModalOpen(false)}
        message={'Do you want to delete this Email Template?'}
        open={modalOpen}
        submitHandler={getTemplateDelete}
      />
    </>
  );
}

function Row({ row = [], deleteItem, permission }: any) {
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const updateFormById = (id: any) => {
    return `/emailtemplate/update/${id}`;
  };
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
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.lang === 'ar' ? 'Arabic' : 'English'}</TableCell>
        <TableCell>{row.description}</TableCell>
        {/* <TableCell>{row.text_part}</TableCell>
        <TableCell>{row.html_part}</TableCell> */}
        <TableCell>{row?.active === true ? 'Active' : 'Inactive'}</TableCell>

        <TableCell align="right">
          <Box display={'flex'} justifyContent={'end'} gap={3}>
            <Link to={updateFormById(row.id)}>
              <IconButton
                title={t('EDIT')}
                variant="light"
                color="info"
                // onClick={() => updateFormById(row.id)}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            {permission === 'FULL' && (
              <IconButton
                title={t('DELETE')}
                variant="light"
                onClick={() => deleteItem(row)}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
