import {
  Container,
  Grid,
  List,
  ListItem,
  MenuItem,
  Modal,
  Box,
} from '@mui/material';
import Logo from '../../../assets/Logo.svg';
import WhiteLogo from '../../../assets/Requested Logo for web/Full logo - SVG - Transparent white.svg';
import css from './HeaderStyle.module.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useCallback, useEffect, useState } from 'react';
import LoginIcon from '../../../assets/Login-icon.svg';
import CartIcon from '../../../assets/Cart-icon.svg';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import searchIcon from '../../../assets/searchIcon.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthPopup from '../../pages/auth';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCity } from '../../store/slice/CityName';
import { lang, localeLang } from '../../utils/getLang';
import { fetchData } from '../../store/slice/CartCount';
import { useLocalStorage, useWindowSize } from 'berlin-common';
import {
  loginPopupChange,
  loginPopupChangeOut,
} from '../../store/slice/LoginSlice';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import SearchAutoComplete from '../autocomplete';
// import SearchAutoComplete from '../autocomplete';

// import { autocomplete } from '@algolia/autocomplete-js';

const MainHeaderAr = () => {
  const { isTokenValid } = useLocalStorage();
  const { t, i18n } = useTranslation('translation');
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

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { size } = useWindowSize();
  const { totalCartCount } = useSelector((state: any) => state?.cartItems);
  const name = useSelector((state: any) => state?.cityName?.name);
  const [language, setLanguage] = useState(name);
  const [searchItem, setSearchItem] = useState<any>();
  const handleOpen = () => dispatch(loginPopupChange());
  const handleClose = () => dispatch(loginPopupChangeOut());
  const [prevParams, setPrevParams] = useState({});
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const queryParams = Object.fromEntries(searchParams.entries());
  const otherParams = { ...queryParams };
  delete otherParams['q'];
  const newQueryParams = new URLSearchParams(otherParams).toString();
  // const [localLang, setLocalLang] = useState('en');

  const dispatch = useDispatch();
  // const [autocompleteSearch, setAutocompleteSearch] = useState(null);

  const isLoginPopupOpen = useSelector(
    (state: any) => state.login?.isLoginPopupOpen
  );

  // useEffect(() => {
  //   // autocompleteInstance();
  //   const autocompleteInstance = createAutocomplete();
  //   console.log('ppppp');
  // }, []);

  useEffect(() => {
    if (location.pathname.includes('/search')) {
      setSearchItem(search);
    } else {
      setSearchItem('');
    }
  }, [location.pathname]);

  const languageHandleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    dispatch(selectedCity(event.target.value));
    navigate('/');
    // dispatch(logInHandler(response.data));
  };
  const loginDetails = localStorage.getItem('loginDetails');
  useEffect(() => {
    if (isTokenValid) {
      if (size > 768) {
        dispatch(fetchData({}));
      }
    }
  }, [isTokenValid]);

  const searchData = () => {
    navigate(`${lang}/search?q=${searchItem}&${newQueryParams}`);
  };

  const loginPopup = () => {
    handleOpen();
  };

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

  // Cart Link New tab

  const cartItemListTab = () => {
    return loginDetails ? `${lang}/cart` : loginPopup();
  };

  return (
    <>
      <div className={`${css.mainHeader} RTLComponent`}>
        {currentPath.includes('checkout') && (
          <p className={css.privacyPolicyText}>
            {t('LENIENCE_AND_PRIVACY_POLICY')}
          </p>
        )}
        <div className={css.mainHeaderTop}>
          <Container maxWidth="xl" className={css.mainContainer}>
            <Grid
              container
              className={`${css.alignItemsCenter} ${css.justifyContentBetween}`}
            >
              <Grid item sm={2} md={2} lg={2} xl={2}>
                <Link to={'/'}>
                  <img
                    loading="lazy"
                    src={WhiteLogo}
                    alt={t(`HAPIDO`)}
                    className={`${css.imgFluid} ${css.imgAlign}`}
                    // onClick={() => {
                    //   navigate('/');
                    // }}
                  />
                </Link>
              </Grid>
              <Grid
                item
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className={`${css.searchWidth} customAutocomplete`}
              >
                {/* // TODO: */}
                {/* <SearchAutoComplete /> */}
                <input
                  className={`RTLSearchInput`}
                  type="text"
                  value={searchItem}
                  placeholder={t('WHAT_ARE_YOU_LOOKING_FOR')}
                  onChange={(e) => setSearchItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      searchData();
                    }
                  }}
                />
                <div className={`RTLSearchIcon`} onClick={() => searchData()}>
                  <img
                    loading="lazy"
                    src={searchIcon}
                    alt={t(`HAPIDO`)}
                    className={css.imgFluid}
                  />
                </div>
              </Grid>

              <Grid
                item
                sm={2}
                md={3}
                lg={3}
                xl={3}
                className={css.languageSelect}
                display={'flex'}
              >
                <Select
                  value={language}
                  onChange={languageHandleChange}
                  displayEmpty
                  inputProps={{
                    'aria-label': 'Without label',
                  }}
                  className={css.selectLang}
                  IconComponent={ExpandMoreIcon}
                  disabled
                >
                  {stateLanguage.map((item, index) => (
                    <MenuItem
                      value={item.Name}
                      className={css.borderBottom}
                      key={index}
                    >
                      <List className={css.data}>
                        <ListItem>
                          <div className={css.langCountryName}>
                            {item?.Name === 'Dubai' ? 'UAE' : item.Name}
                          </div>
                        </ListItem>
                      </List>
                    </MenuItem>
                  ))}
                </Select>
                {/* Change Language code */}
                {/* // TODO: Don't Remove */}
                <div className={`${css.languageBtn} RTLLanguageBtn`}>
                  {localeLang === 'ar' ? (
                    <button onClick={changeLang_en}>English</button>
                  ) : (
                    <button disabled={false} onClick={changeLang_ar}>
                      العربية
                    </button>
                  )}
                </div>
              </Grid>
              <Grid
                item
                sm={4}
                md={3}
                lg={3}
                xl={3}
                className={css.userAndCart}
              >
                <div
                  className={`${css.dFlex} ${css.alignItemsCenter} ${css.justifyContentAround}`}
                >
                  {loginDetails ? (
                    <Link to={`${lang}/profile`}>
                      <div
                        className={`${css.headerSignInText} RTLHeaderSignInText`}
                        // onClick={() => navigate(`${lang}/profile`)}
                      >
                        {t('ACCOUNT')}
                        <img loading="lazy" src={LoginIcon} alt="" />
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`${css.headerSignInText} RTLHeaderSignInText`}
                      onClick={() => {
                        loginPopup();
                      }}
                    >
                      {t('SIGN_IN')}
                      <img loading="lazy" src={LoginIcon} alt={t(`HAPIDO`)} />
                    </div>
                  )}
                  <div className={css.dividerLine}></div>
                  {loginDetails ? (
                    <Link to={`${lang}/cart`}>
                      <div
                        className={`${css.headerSignInText} RTLHeaderSignInText`}
                      >
                        {t('CART')}
                        <div className={css.cartImg}>
                          <Badge
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            className={css.cartBadge}
                            badgeContent={JSON.stringify(totalCartCount || 0)}
                          >
                            <img
                              loading="lazy"
                              src={CartIcon}
                              alt={t(`HAPIDO`)}
                            />
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className={`${css.headerSignInText} RTLHeaderSignInText`}
                      onClick={() => {
                        loginPopup();
                      }}
                    >
                      {t('CART')}
                      <div className={css.cartImg}>
                        <Badge
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          className={css.cartBadge}
                          badgeContent={JSON.stringify(totalCartCount || 0)}
                        >
                          <img
                            loading="lazy"
                            src={CartIcon}
                            alt={t(`HAPIDO`)}
                          />
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      {/* Auth Model */}
      <Modal
        open={isLoginPopupOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={css.loginModel}>
          <AuthPopup />
        </Box>
      </Modal>
    </>
  );
};

export default MainHeaderAr;
