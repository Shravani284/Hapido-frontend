import { useState } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'


// ==============================|| DATE PICKER - BASIC ||============================== //

export default function DateTimePickers() {
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker value={value} onChange={handleChange}/>
  </LocalizationProvider>
  );
}
