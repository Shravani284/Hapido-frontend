import { useTranslation } from 'react-i18next';
import css from './ClockPopup.module.scss';

const TimeButton = ({
  firstWord,
  secondWord,
  onClick,
  timeBtnActive,
  available_count,
  isDisabled,
}: any) => {
  const { t } = useTranslation('translation');
  return (
    <div>
      <button
        onClick={onClick}
        disabled={isDisabled || available_count == 0}
        className={timeBtnActive ? css.timeBtnClicked : css.timeButton}
      >
        <div className={css.firstWord}>{firstWord}</div>
        <div className={timeBtnActive ? css.slashActive : css.slash}> </div>
        <div className={css.secondWord}>{secondWord}</div>
      </button>
      {available_count ? (
        <div className={css.statusText}>
          {t(`AVAILABLE`)} {available_count}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TimeButton;
