import { Container, Grid, List, ListItem, MenuItem } from '@mui/material';
import Logo from '../../../assets/Logo.svg';
import WhiteLogo from '../../../assets/Requested Logo for web/Full logo - SVG - Transparent white.svg';
import css from './HeaderStyle.module.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import searchIcon from '../../../assets/searchIcon.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCity } from '../../store/slice/CityName';
import { lang, localeLang } from '../../utils/getLang';
import SearchAutoComplete from '../autocomplete';

const MobileMainHeader = () => {
  const stateLanguage = [
    {
      Name: 'Dubai',
    },
    {
      Name: 'Abu Dhabi',
    },
    {
      Name: 'Sharjah',
    },
    {
      Name: 'Ajman',
    },
    {
      Name: 'Ras Al Khaimah',
    },
    {
      Name: 'Umm Al Quwain',
    },
    {
      Name: 'Fujairah',
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const name = useSelector((state: any) => state?.cityName?.name);
  const [language, setLanguage] = useState(name);
  const [searchItem, setSearchItem] = useState<string>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const queryParams = Object.fromEntries(searchParams.entries());
  const otherParams = { ...queryParams };
  delete otherParams['q'];
  const newQueryParams = new URLSearchParams(otherParams).toString();
  const [localLang, setLocalLang] = useState('en');
  const { t, i18n } = useTranslation('translation');

  // const languageHandleChange = (event: SelectChangeEvent) => {
  //   setLanguage(event.target.value as string);
  //   dispatch(selectedCity(event.target.value));
  //   navigate('./');
  // };

  const changeLang_ar = () => {
    i18n.changeLanguage('ar');
    const newPath = currentPath.replace('/ae-en/', '/ae-ar/');
    navigate(newPath, { replace: true });
    window.location.reload();
    // localStorage.setItem('language', JSON.stringify('ar'));
  };

  const changeLang_en = () => {
    i18n.changeLanguage('en');
    const newPath = currentPath.replace('/ae-ar/', '/ae-en/');
    navigate(newPath, { replace: true });
    window.location.reload();
    // localStorage.setItem('language', JSON.stringify('en'));
  };

  // Search Product

  const searchData = () => {
    navigate(`${lang}/search?q=${searchItem}&${newQueryParams}`);
  };

  return (
    <>
      <div className={css.mobmainHeader}>
        <div className={css.mobmainHeaderTop}>
          <Container maxWidth="xl" className={css.mobmainContainer}>
            <Grid
              container
              className={css.mobalignItemsCenter}
              alignItems={'center'}
            >
              <Grid item xs={2.5}>
                <Link to={'/'}>
                  <img
                    loading="lazy"
                    src={WhiteLogo}
                    alt={t(`HAPIDO`)}
                    className={`${css.mobimgFluid} ${css.mobimgAlign}`}
                    // onClick={() => {
                    //   navigate('/');
                    // }}
                  />
                </Link>
              </Grid>
              <Grid item xs={6.5} className={css.mobsearchWidth}>
                {/* <SearchAutoComplete /> */}
                <input
                  className={css.mobSearchInput}
                  type="text"
                  placeholder={t('WHAT_ARE_YOU_LOOKING_FOR')}
                  onChange={(e) => setSearchItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      searchData();
                    }
                  }}
                />
                <div className={css.mobSearchIcon} onClick={() => searchData()}>
                  <img
                    loading="lazy"
                    src={searchIcon}
                    alt={t(`HAPIDO`)}
                    className={css.mobimgFluid}
                  />
                </div>
              </Grid>
              <Grid item xs={3} className={css.moblanguageSelect}>
                {/* <Select
                  value={language}
                  onChange={languageHandleChange}
                  displayEmpty
                  inputProps={{
                    'aria-label': 'Without label',
                  }}
                  className={`${css.mobselectLang}`}
                  IconComponent={ExpandMoreIcon}
                  disabled
                >
                  {stateLanguage.map((item, index) => (
                    <MenuItem
                      value={item.Name}
                      className={css.mobborderBottom}
                      key={index}
                    >
                      <List className={css.mobdata}>
                        <ListItem
                          sx={{ paddingLeft: '0px ', overflow: 'hidden' }}
                        >
                          <div className={css.moblangCountryName}>
                            {item?.Name === 'Dubai' ? 'UAE' : item.Name}
                          </div>
                        </ListItem>
                      </List>
                    </MenuItem>
                  ))}
                </Select> */}
                <div className={css.languageBtnMob}>
                  {localeLang === 'ar' ? (
                    <button onClick={changeLang_en}>UAE-English</button>
                  ) : (
                    <button onClick={changeLang_ar}>UAE-العربية</button>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MobileMainHeader;
