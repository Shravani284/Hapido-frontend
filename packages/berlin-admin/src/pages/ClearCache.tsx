import { Button } from '@mui/material';
import { ConfirmBoxAlert } from 'berlin-common';
import React, { useState } from 'react';
import { clearAllCaches } from '../services/clearCachesServices';
import { useDispatch } from 'react-redux';
import { setSnackbarConfig } from '../store/slice/Loader';

const ClearCache = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    clearAllCaches()
      .then((response: any) => {
        console.log(response);
        if (response?.data?.success == true) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message:
                'All Caches Cleared successfully' || response?.data?.data,
              varient: 'success',
            })
          );
        }

        setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          width: '100%',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Clear all Cache?
        </Button>
      </div>
      {modalOpen && (
        <ConfirmBoxAlert
          title={'Confirm?'}
          handleClose={() => setModalOpen(false)}
          message={'Do you want to clear all the caches ?'}
          open={modalOpen}
          submitHandler={() => handleSubmit()}
        />
      )}
    </>
  );
};

export default ClearCache;
