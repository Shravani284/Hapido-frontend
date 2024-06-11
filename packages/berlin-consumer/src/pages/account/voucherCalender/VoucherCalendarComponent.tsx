import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import css from './VoucherCalenderComp.module.scss';
import Iconfeatherinfo from '../../../../assets/Iconfeather-info.svg';
import Iconfeatherinfo1 from '../../../../assets/Iconfeather-info1.svg';
import { useTranslation } from 'react-i18next';


// Type definition for the date value in your component
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const VoucherCalendarComponent = ({ name, formik, setCalenderOpen }: any) => {
  const { t } = useTranslation('translation');
  const [dateLabels, _setDateLabels] = useState<{ [key: string]: string }>({
    '2023-11-27': 'AED 59',
    '2023-11-28': 'AED 59',
    '2023-11-29': 'AED 59',
    '2023-11-30': 'AED 59',
    '2023-12-30': 'AED 59',
    '2023-12-01': 'AED 59',
    '2023-12-02': 'AED 59',
    '2023-12-03': 'AED 59',
    '2023-12-04': 'AED 59',
    '2023-12-05': 'AED 59',

    // ...other date-label pairs
  });

  const renderTileContent = ({ date }: any) => {
    const momentString = moment(date).format('YYYY-MM-DD');
    const label = dateLabels[momentString] || '';

    return (
      <div className={css.tileContent}>
        <div className={css.date}>{date.getDate()}</div>
        <div className={css.label}>{label}</div>
      </div>
    );
  };

  const changeHandler = (value: Value) => {
    // datePickerHandler(value);
    // To set the field value in Formik, you should use formik.setFieldValue
    // Example:
    formik.setFieldValue(name, value);
    setCalenderOpen(false);
  };

  const disabledDates = [
    moment('2023-12-01').toDate(), // Convert moment objects to Date objects
    moment('2023-12-02').toDate(), // Convert moment objects to Date objects
    moment('2023-12-11').toDate(), // Convert moment objects to Date objects
    moment('2023-12-12').toDate(), // Convert moment objects to Date objects
    moment('2023-12-13').toDate(), // Convert moment objects to Date objects
    moment('2023-12-14').toDate(), // Convert moment objects to Date objects
    moment('2023-12-15').toDate(), // Convert moment objects to Date objects
    moment('2023-12-16').toDate(), // Convert moment objects to Date objects
    moment('2023-12-17').toDate(), // Convert moment objects to Date objects
    moment('2023-12-18').toDate(), // Convert moment objects to Date objects
    moment('2023-12-19').toDate(), // Convert moment objects to Date objects
    moment('2023-12-20').toDate(), // Convert moment objects to Date objects
    moment('2023-12-21').toDate(), // Convert moment objects to Date objects
    moment('2023-12-22').toDate(), // Convert moment objects to Date objects
    moment('2023-12-23').toDate(), // Convert moment objects to Date objects
    moment('2023-12-24').toDate(), // Convert moment objects to Date objects
    moment('2023-12-25').toDate(), // Convert moment objects to Date objects
    moment('2023-12-26').toDate(), // Convert moment objects to Date objects
    // Add more dates as needed
  ];

  const isDayDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) => date.getTime() === disabledDate.getTime()
    );
  };

  const getDayClassName = ({ date }: any) => {
    return isDayDisabled(date) ? 'disabled-day diagonal-line' : '';
  };

  return (
    <div className="voucherCalender">
      <Calendar
        tileClassName={getDayClassName}
        onChange={changeHandler}
        value={formik.values[name]}
        tileContent={renderTileContent}
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => ''}
        formatWeekday={(locale, date) => ''}
        minDate={new Date()} // Set the minimum date to today
        minDetail="month"
        showNavigation={true}
        showNeighboringMonth={false}
      />
      <div className={css.featherInfo}>
        <img
          loading="lazy"
          className={css.featherIcon}
          src={Iconfeatherinfo}
          alt={t('FEATHERINFO')}
        />{' '}
        {t('ALL_DATES_ARE_IN_THE_LOCAL_TIME')}
      </div>
      <div className={css.featherInfo}>
        <img
          loading="lazy"
          className={css.featherIcon}
          src={Iconfeatherinfo1}
          alt={t('FEATHERINFO')}
        />{' '}
        {t('NOT_AVAILABLE')}
      </div>
    </div>
  );
};

export default VoucherCalendarComponent;
