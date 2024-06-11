import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import css from './ConsumerConfirmBoxAlert.module.scss';
import { Box, color } from '@mui/system';
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ImodalPros {
  title: string;
  message: string;
  open: boolean;
  handleClose: () => void;
  submitHandler: () => void;
}

export default function ConsumerConfirmBoxAlert({
  title,
  message,
  open,
  handleClose,
  submitHandler,
}: ImodalPros) {
  const { t } = useTranslation('translation');
  return (
    <div>
      <Dialog
        className={'cardContainer'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            className={'MsgText'}
            id="alert-dialog-slide-description"
          >
            {message}
          </DialogContentText>
        </DialogContent>

        <Box display={'flex'} justifyContent={'center'} gap={2} mb={3}>
          <Button
            className={css.CancelBtn}
            sx={{
              border: '1px solid #d4d5d7',
              borderRadius: '8px',
              padding: '8px 20px',
              color: '#3C4A53',
            }}
            onClick={handleClose}
          >
            {t(`CANCEL`)}
          </Button>
          <Button className={css.ConfirmBtn} onClick={submitHandler}>
            {t(`CONFIRM`)}
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}
