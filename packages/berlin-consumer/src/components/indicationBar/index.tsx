import css from './IndicationBars.module.scss';
// import variables from '../../../../berlin-common/src/global-styles/_variables.module.scss';
import successIcon from '../../../assets/successIcon.svg';
import warningIcon from '../../../assets/warningIcon.svg';
import errorIcon from '../../../assets/errorIcon.svg';
import infoIcon from '../../../assets/infoIcon.svg';
import close from '../../../assets/close.svg';
import { useState } from 'react';

const IndicationBars = ({ type, message }: any) => {
  const [isClosed, setIsClosed] = useState(false);
  let icon;
  let backgroundColor;
  let textColor;

  switch (type) {
    case 'success':
      icon = successIcon;
      backgroundColor = '#D1E6DE';
      textColor = '#038654';
      break;
    case 'warning':
      icon = warningIcon;
      backgroundColor = '#FFF3CD';
      textColor = '#937A05';
      break;
    case 'error':
      icon = errorIcon;
      backgroundColor = '#F7D7DA';
      textColor = '#9A0404';
      break;
    default:
      icon = infoIcon;
      backgroundColor = '#CFF4FC';
      textColor = '#048191';
      break;
  }

  const statusClose = () => {
    setIsClosed(true);
  };

  return (
    !isClosed && (
      <div
        className={css.customStatusBar}
        style={{ backgroundColor, color: textColor }}
      >
        <img loading="lazy" src={icon} className={css.statusIcon} />
        <div className={css.statusMessage}>{message}</div>
        <button className={css.closeButton} onClick={statusClose}>
          <img loading="lazy" src={close} />
        </button>
      </div>
    )
  );
};
export default IndicationBars;
