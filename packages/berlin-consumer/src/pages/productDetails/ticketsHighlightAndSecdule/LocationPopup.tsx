import css from './ticketsHighlightAndSchedule.module.scss';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function PackageDropDown({
  locationPicker,
  locationValue,
  option,
}: any) {
  const locationHandler = (value: any) => {
    locationPicker(value);
  };
  const { t } = useTranslation('translation');
  return (
    <>
      {option?.length > 0 ? (
        <ul>
          {option?.map((item: any, index) => {
            return (
              <li
                onClick={() => locationHandler(item)}
                key={index}
                className={`${css.locationCustom} ${
                  item.id === locationValue?.id ? css.active : ''
                }`}
              >
                <ArrowRightIcon />
                <Box>{item.label}</Box>
              </li>
            );
          })}
        </ul>
      ) : (
        t(`NO_DATA_AVAILABLE`)
      )}
    </>
  );
}
