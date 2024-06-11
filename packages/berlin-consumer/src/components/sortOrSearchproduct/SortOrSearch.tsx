import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import css from './SortOrSearchproduct.module.scss';
import { useEffect, useRef, useState } from 'react';

interface dataListType {
  label: string;
  DataList: datalistObject[];
  type: 'checkbox' | 'radio'; // Specify the exact type values
  selectHandler: (e: any) => void;
  value: any;
}

interface datalistObject {
  label: string;
  value: number;
}

const SortOrSearch = ({
  label,
  DataList,
  type,
  selectHandler,
  value,
}: dataListType) => {
  const [openClose, setOpenClose] = useState<boolean>(false);

  const selectItem = (e: string) => {
    const isAlredySelected = value.indexOf(e);
    if (isAlredySelected !== -1) {
      const multiSelectValues = [...value];
      multiSelectValues.splice(isAlredySelected, 1);
      selectHandler(multiSelectValues);
    } else {
      const multiSelectValues = [...value, e];
      selectHandler(multiSelectValues);
    }
  };

  // Radio data
  const selectItemRadio = (e: string | number) => {
    selectHandler(e);
    setTimeout(() => {
      setOpenClose(false);
    }, 200);
  };

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpenClose(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Box className={css.dropDown} ref={divRef}>
        <Box
          className={css.mainDropDown}
          onClick={() => setOpenClose(!openClose)}
        >
          <Box className={css.dropDownLabel}>{label}</Box>
          {openClose ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}
        </Box>
        {openClose && (
          <Box className={css.openDropDown}>
            {DataList?.map((item: any, index: number) => (
              <Box key={index} className={css.singleItem}>
                {type === 'checkbox' ? (
                  <>
                    <input
                      type="checkbox"
                      value={item?.id}
                      name="categories"
                      id={`checkbox-${item.id}`}
                      onChange={(e) => selectItem(e.target.value)}
                      checked={value.includes(String(item.id))}
                    />
                    <label
                      className={css.listLabel}
                      htmlFor={`checkbox-${item.id}`}
                    >
                      {item?.translations[0]?.text}
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      type="radio"
                      value={item.value}
                      name="categories"
                      id={`radio-${item.value}`}
                      onChange={() => selectItemRadio(item.value)}
                      checked={value === item.value}
                    />
                    <label
                      className={css.listLabel}
                      htmlFor={`radio-${item.value}`}
                    >
                      {item.label}
                    </label>
                  </>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default SortOrSearch;
