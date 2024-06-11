import css from './VoucherCalenderComp.module.scss';
import { Card } from '@mui/material';
import VouchercalenderIcon from '../../../../assets/VouchercalenderIcon.svg';
import { useTranslation } from 'react-i18next';

interface IProps {
  label: string;
  children: string | JSX.Element | JSX.Element[];
  calenderOpen: boolean;
  setCalenderOpen: (data: any) => void;
}

function VoucherCalenderPopupAr({
  label,
  children,
  calenderOpen,
  setCalenderOpen,
}: IProps) {
  const handleToggle = () => {
    setCalenderOpen(!calenderOpen);
  };
  const { t } = useTranslation('translation');

  return (
    <>
      <div className={css.dropdownContainer}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px 0 20px',
            marginTop: '-8px',
          }}
          onClick={handleToggle}
          className={css.scheduleInputFields}
        >
          <div className={css.popupText}>{label}</div>
          <div>
            <img
              loading="lazy"
              src={VouchercalenderIcon}
              style={{ height: '24px' }}
              alt={t('CALENDERICON')}
            />
          </div>
        </div>
        {calenderOpen && (
          <Card style={{ maxWidth: '698px' }} className={css.card}>
            {children}
          </Card>
        )}
      </div>
    </>
  );
}

export default VoucherCalenderPopupAr;
