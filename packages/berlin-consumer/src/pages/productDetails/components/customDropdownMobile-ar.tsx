import { Dialog, Modal } from '@mui/material';
import { PrimaryButton } from 'berlin-common';
import './index.scss';

interface Iprops {
  open: any;
  name: string;
  setOpen?: (data: any) => void;
  children: any;
}

function ScheduleModuleAr({ open, name, setOpen, children }: Iprops) {
  return (
    <>
      <Modal
        open={open[name]}
        onClose={() => setOpen({})}
        className="modalPopupContiner"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="modalPopup">
          <div>{children}</div>
        </div>
      </Modal>
    </>
  );
}

export default ScheduleModuleAr;
