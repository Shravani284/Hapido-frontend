import { Box, Button, Grid, Modal } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
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
  Breadcrumbs,
  Typography,
} from '@mui/material';

type PreviewModalType = {
  isOpen: boolean;
  closeModal: () => void;
  selectedFiles: any;
  isExcelData: any;
};
export type HeadCell = {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean | undefined;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
};

const headCells: HeadCell[] = [
  {
    id: 'sr_no',
    numeric: false,
    disablePadding: true,
    label: 'Sr No',
  },
  {
    id: 'purchased_date',
    numeric: false,
    disablePadding: true,
    label: 'Voucher Code',
  },
  {
    id: 'purchased_date',
    numeric: false,
    disablePadding: true,
    label: 'Purchased Date',
  },
  {
    id: 'redeemed',
    numeric: false,
    disablePadding: true,
    label: 'Redeemed',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: true,
    label: 'Price',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
];

const DocView = ({
  isOpen = false,
  closeModal = () => {},
  selectedFiles,
  isExcelData,
}: PreviewModalType) => {
  const [items, setItems] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [dense] = useState(false);
  const [loading, setLoading] = useState(false);

  const excelShowHandler = (file: any) => {
    setLoading(true);
    const promise = new Promise((resolve, reject) => {
      const wb = XLSX.read(file?.data?.data, { type: 'buffer' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      resolve(data);
    });
    promise.then((d: any) => {
      setItems(d);
      let data: any = [...d];
      let newData = data.slice(3);
      const result = [];
      newData.forEach((e: any, i: any) => {
        if (i === 0) return;
        result.push({
          sr_no: e[''],
          voucher_code: e['__EMPTY'],
          purchased_date: e['__EMPTY_1'],
          redeemed: e['__EMPTY_2'],
          price: e['__EMPTY_3'],
          status: e['__EMPTY_4'],
        });
      });

      setDataList(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    excelShowHandler(selectedFiles);
  }, [selectedFiles]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            flexWrap: 'wrap',
            minWidth: '80%',
            height: '70%',
            overflowY: 'scroll',
          }}
        >
          <Grid container spacing={3.5}>
            <Grid item xs={6} sm={9}>
              <h2 id="parent-modal-title">File Details</h2>
            </Grid>
            <Grid item xs={6} sm={3} display={'flex'} justifyContent={'end'}>
              <Button color="secondary" component="span" onClick={closeModal}>
                <Cancel />
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3.5}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            {isExcelData ? (
              <>
                <Grid item xs={12} sm={12}>
                  <div>
                    <div>Deal ID: {items[0]?.['__EMPTY']}</div>
                    <div>
                      Deal was active:
                      {items[1]?.['__EMPTY']}
                    </div>
                    <div>
                      Deal Description:
                      {items[2]?.['__EMPTY'] ? items[2]?.['__EMPTY'] : 'N.A.'}
                    </div>
                  </div>
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
                        {dataList &&
                          dataList.length > 0 &&
                          dataList.map((row: any) => {
                            return (
                              <TableRow hover tabIndex={-1} key={row.sr_no}>
                                <TableCell>{row?.sr_no}</TableCell>
                                <TableCell>
                                  {row?.voucher_code
                                    ? row?.voucher_code
                                    : 'N.A.'}
                                </TableCell>
                                <TableCell>
                                  {row?.purchased_date
                                    ? row?.purchased_date
                                    : 'N.A.'}
                                </TableCell>
                                <TableCell>
                                  {row?.redeemed ? row?.redeemed : 'N.A'}
                                </TableCell>
                                <TableCell>
                                  {row?.price ? row?.price : 'N.A.'}
                                </TableCell>
                                <TableCell>
                                  {row?.status ? row?.status : 'N.A.'}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                No data found.
              </div>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default DocView;
