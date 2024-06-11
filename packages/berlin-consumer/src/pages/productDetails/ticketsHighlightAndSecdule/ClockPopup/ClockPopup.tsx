import React, { useState } from 'react';
import css from './ClockPopup.module.scss';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import TimeButton from './TimeButton';
import { formatDateInDubaiTimeZone } from 'berlin-common';
import { useTranslation } from 'react-i18next';

export default function ClockPopup({ clockPicker, clockValue, option }: any) {
  const { t } = useTranslation('translation');
  const timeTicket = (data: any) => {
    clockPicker(data);
  };
  // const isDisabled = true;
  function formatTime(hours: number, minutes: number): JSX.Element {
    // const date = new Date();
    // date.setHours(hours, minutes);
    // const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    // const hour12 = date.getHours() % 12 || 12;
    const date = new Date(); // or your specific date
    const formattedDateString = formatDateInDubaiTimeZone(date);

    // Convert the formatted date string back to a Date object
    const dubaiDate = new Date(formattedDateString);
    dubaiDate?.setHours(hours, minutes);
    const amPm = dubaiDate.getHours() >= 12 ? 'PM' : 'AM';
    const hour12 = dubaiDate.getHours() % 12 || 12;

    return (
      <span>
        <span>{hour12}</span>:
        {minutes?.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        <span style={{ paddingLeft: '3px' }}>{amPm}</span>
      </span>
    );
  }
  <p>
    {/* {item.slot_date &&
    moment.utc(item.slot_date).format('DD MMM YYYY')}{' '} */}
    {/* {`${item.start_hour}:${item.start_minute} ${
    item?.start_hour > 12 ? 'PM' : 'AM'
  } `} */}
  </p>;

  return (
    <div className={css.clockPopup}>
      {option?.map((items, index) => {
        return (
          <div key={index}>
            <TimeButton
              onClick={() => {
                timeTicket(items);
              }}
              isDisabled={items?.isDisabled}
              firstWord={formatTime(items.start_hour, items.start_minute)}
              secondWord={`${t(`AED`)} ${items?.slot_price}`}
              timeBtnActive={items?.id == clockValue?.id}
              timeTicket={timeTicket}
              available_count={items?.available_count}
            />
          </div>
        );
      })}
    </div>
  );
}
