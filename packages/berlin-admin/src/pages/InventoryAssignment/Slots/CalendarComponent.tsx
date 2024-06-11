import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
interface CalendarComponentProps {
  date: any;
  dealCalenderData: {
    date: string;
    isDisabled: boolean;
  }[];
  setDate: any;
}

export default function CalendarComponent({
  dealCalenderData,
  setDate,
  date,
}: CalendarComponentProps) {
  const [value, setValue] = useState<any>(date); // Initialize with the current date

  // Reset the date to the current date when dealItem changes
  useEffect(() => {
    if (date) {
      setValue(date);
    }
  }, [date]);

  const dateChangeHandler = (e) => {
    const originalDate = moment(e).format('YYYY-MM-DD');
    setDate(originalDate);
    // setValue(e);
  };

  const firstActiveDate = dealCalenderData?.findIndex(
    (e) => e.isDisabled === false
  );
  // if (firstActiveDate) {
  const startDate =
    dealCalenderData.length > 0
      ? new Date(dealCalenderData[firstActiveDate]?.date)
      : new Date();
  // }
  const tileDisabled = ({ date }: { date: Date }): boolean => {
    const originalDate = moment(date).format('YYYY-MM-DD');
    const isExpiredDeal = true;

    const currentDate = new Date();

    // Subtract one day
    const oneDayAgo = new Date(currentDate);
    oneDayAgo.setDate(currentDate.getDate() - 1);

    if (date < oneDayAgo) {
      return true;
    }

    if (dealCalenderData.length === 0) {
      return true;
    }

    if (date > new Date(dealCalenderData[dealCalenderData?.length - 1]?.date)) {
      return true;
    }

    const disabledDate = dealCalenderData.find(
      (item) => item.date === originalDate && item.isDisabled
    );

    return disabledDate ? true : false;
  };

  const tileClassName = ({ date }: { date: Date }): string | null => {
    const originalDate = moment(date).format('YYYY-MM-DD');
    const isHighlighted = dealCalenderData.some(
      (item) => item.date === originalDate && !item.isDisabled
    );

    return isHighlighted
      ? 'highlighted-date'
      : date?.toISOString().split('T')[0] === moment().format('YYYY-MM-DD')
      ? 'current-date'
      : null;
  };

  return (
    <div className="customCalender">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Calendar
          onChange={dateChangeHandler}
          value={value == 'Invalid Date' ? null : value}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          next2Label={null}
          prev2Label={null}
          showNavigation={true}
          calendarType="US"
          minDate={startDate}
          minDetail="month"
          locale={moment.locale()}
        />
      </LocalizationProvider>

      <Grid container className="calenderValueTip" spacing={3}>
        <Grid item xs={6} md={6}>
          <div className="legend-item">
            <div className="legend-color activeTip"></div>
            <span>Selected Date</span>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <div className="legend-item">
            <div className="legend-color disabledTip"></div>
            <span>Disabled Date</span>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <div className="legend-item">
            <div className="legend-color allocatedTip"></div>
            <span>Selectable Date</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
