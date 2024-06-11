import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import css from './CalenderComp.module.scss';
import { formatDateInDubaiTimeZone } from 'berlin-common';
import { useTranslation } from 'react-i18next';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponentAr = ({
  datePickerHandler,
  value,
  priceOptions,
}: any) => {
  const [dateLabels, setDateLabels] = useState<string | any>({});
  const [isZeroAllocation, setIsZeroAllocation] = useState(['']);
  const lastDate = priceOptions[priceOptions.length - 1];
  const { t } = useTranslation('translation');

  useEffect(() => {
    priceOptions?.map((e) => {
      if (e?.isDisabled) {
        setIsZeroAllocation((array) => [...array, e.date]);
      }
    });
  }, []);

  const renderTileContent = ({ date }: any) => {
    //  const label = dateLabels[date.toISOString().split("T")[0]];
    var momentObj = moment(date);
    var momentString = momentObj.format('YYYY-MM-DD');
    const label = dateLabels[momentString];
    // const dateString = date.toISOString().split('T')[0];
    // const label = 'AED59';
    // dateLabels[dateString] = label;
    return (
      <div className={css.tileContent}>
        <div className={css.date}>{date.getDate()}</div>
        <div className={css.label}>{label}</div>
      </div>
    );
  };

  // const [value, setValue] = useState<Value>(new Date());

  const changeHandler = (value: Value) => {
    // setValue(value);
    datePickerHandler(value);
  };
  useEffect(() => {
    const obj = {};
    priceOptions?.forEach((e) => {
      obj[e.date] = !e.isDisabled
        ? e.price > 0
          ? `${t(`AED`)} ${e.price}`
          : ''
        : '';
    });
    setDateLabels(obj);
  }, [priceOptions]);

  const tileDisabled = ({ date }: { date: Date }): boolean => {
    const originalDate = moment(date).format('YYYY-MM-DD');
    const disabledDate = priceOptions?.find(
      (item) =>
        (item?.date === originalDate && item?.isDisabled) ||
        (item?.date === originalDate && item?.price == 0)
    );

    return disabledDate ? true : false;
  };
  const date = new Date(); // or your specific date
  const formattedDateString = formatDateInDubaiTimeZone(date);

  // Convert the formatted date string back to a Date object
  const dubaiMinDate = new Date(formattedDateString);
  return (
    <div className="customCalender">
      <Calendar
        onChange={changeHandler}
        value={value}
        tileContent={renderTileContent}
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) => ''}
        formatWeekday={(locale, date) => ''}
        formatShortWeekday={(locale, date) =>
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
        }
        minDate={dubaiMinDate}
        maxDate={
          new Date(moment(lastDate?.date).format('ddd MMM DD YYYY h:mm:ss'))
        }
        //TODO: Another option for disabled dates
        // tileDisabled={({ date }) => isZeroAllocation?.includes(date.getDate())
        tileDisabled={tileDisabled}
        minDetail="month"
        showNavigation={true}
        calendarType="US"
        formatMonthYear={(locale, date) =>
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ][date.getMonth()]
        }
      />
    </div>
  );
};

export default CalendarComponentAr;
