import { Button, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  handlePrev: () => void;
  handleNext: () => void;
  page: number;
  cartCount: number;
  itemsPerPage: number;
}
const Pagination = ({
  handlePrev,
  handleNext,
  page,
  cartCount,
  itemsPerPage,
}: PaginationProps) => {
  const { t, i18n } = useTranslation('translation');

  return (
    <Grid container direction="row" justifyContent="space-between">
      <Button
        sx={{
          backgroundColor: '#fb1d14',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#d10901',
          },
          '&.Mui-disabled': {
            backgroundColor: '#fdb8b8',
            color: '#fff',
          },
        }}
        onClick={handlePrev}
        disabled={page === 1}
      >
        {t('PREV')}
      </Button>
      <span>{`${t('PAGE')} ${page} ${t('OF')} ${Math.ceil(
        cartCount / itemsPerPage
      )}`}</span>
      <Button
        sx={{
          backgroundColor: '#fb1d14',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#d10901',
          },
          '&.Mui-disabled': {
            backgroundColor: '#fdb8b8',
            color: '#fff',
          },
        }}
        onClick={handleNext}
        disabled={page === Math.ceil(cartCount / itemsPerPage)}
      >
        {t('NEXT')}
      </Button>
    </Grid>
  );
};

export default Pagination;
