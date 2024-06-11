import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
} from '@mui/material';
import css from './AddressStyle.module.scss';
import { useTranslation } from 'react-i18next';
import { MagicDropDown, MagicTextField, useWindowSize } from 'berlin-common';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  addAddress,
  getAllArea,
  getCityByCountryId,
  getCountryDropDown,
} from '../../../services/addressService';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { path } from '../../../routes/Routers';
import { lang, localeLang } from '../../../utils/getLang';
import { mPage, viewPageEvent, addressAdd } from '../../../utils/moEngage';
import { MAP_KEY } from '../../../../../../urlConst';
import EditAddressForm from './EditAddressForm';
import EditAddressFormAr from './EditAddressForm-ar';

interface Address {
  address_label: string;
  is_primary: boolean;
  address1: string;
  address2: string;
  area_id: null | dropdown;
  city: string;
  country: {
    label: string;
    id: any;
  };
}

interface dropdown {
  label: string;
  city: String;
  country: String;
  id: string | number;
  coordinates?: string;
}

const initialValue: Address = {
  is_primary: false,
  address1: '',
  address2: '',
  area_id: null,
  address_label: 'Home',
  city: null,
  country: null,
};

const AddressEditAr = () => {
  const [areaList, setAreaList] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState<any>();
  const [coordinatesData, setCoordinatesData] = useState<any>(
    '25.276987,55.296249'
  );
  const [isLoading1, setLoading1] = useState(false);
  const [isLoading2, setLoading2] = useState(false);

  const [isLoading3, setLoading3] = useState(false);

  const [cityId, setCityId] = useState<any>();
  const { i18n, t } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { size } = useWindowSize();
  const receivedData = location.state && location.state.data;
  const profileData = receivedData?.profileData;
  const selectedAddress = receivedData?.selectedAddress;
  const selectedAddressIndex =
    receivedData?.selectedAddressIndex >= 0
      ? receivedData?.selectedAddressIndex
      : '';
  const mapAddress = location.state?.mapAddress;
  const schema = Yup.object().shape({
    address1: Yup.string()
      .min(2, t('TOO_SHORT'))
      .required(t('ADDRESS_1_IS_REQUIRED')),
    address2: Yup.string()
      .min(2, t('TOO_SHORT'))
      .required(t('ADDRESS_2_IS_REQUIRED')),
    area_id: Yup.object().shape({
      label: Yup.string().nullable(),
      city: Yup.string().nullable(),
      country: Yup.string().nullable(),
      id: Yup.string().nullable(),
    }),
    city: Yup.object().required(t('CITY_IS_REQUIRED')),
    country: Yup.object().required(t('COUNTRY_IS_REQUIRED')),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: (values) => {
      AddAddress(values);
    },
  });

  const AddAddress = async (values: Address) => {
    const address = profileData?.addresses.map((e) => {
      return {
        id: e.id,
        user_id: e.user_id,
        area_id: e.area_id,
        address_label: e.address_label,
        is_primary: e.is_primary,
        address1: e.address1,
        address2: e.address2,
        coordinates: e.coordinates,
        created_at: e.created_at,
        updated_at: e.updated_at,
      };
    });
    if (selectedAddressIndex !== '') {
      address[selectedAddressIndex] = {
        id: selectedAddress?.id,
        is_primary: values.is_primary,
        address1: values.address1,
        address2: values.address2,
        area_id: values.area_id?.id,
        address_label: values.address_label,
        coordinates: coordinatesData,
      };
    } else {
      address.push({
        is_primary: values.is_primary,
        address1: values.address1,
        address2: values.address2,
        area_id: values.area_id?.id,
        address_label: values.address_label,
        coordinates: coordinatesData,
      });
    }

    const currentIndex =
      selectedAddressIndex !== '' ? selectedAddressIndex : address.length - 1;

    const payload = {
      ...profileData,
      // addresses: address,
      addresses: handlePrimaryToggle(currentIndex, values.is_primary, address),
    };
    // New Address
    addAddress(payload)
      .then((response) => {
        if (response.success === true) {
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message:
                selectedAddressIndex !== ''
                  ? t('ADDRESS_UPDATED')
                  : t('ADDRESS_ADDED'),
              varient: 'success',
            })
          );
          if (selectedAddressIndex !== '') {
            addressAdd('address_update', formik?.values?.country?.label);
          } else {
            addressAdd('address_add', formik?.values?.country?.label);
          }
          navigate(`/${lang}/addresses`);
        }
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : t('SOMETHING_WENT_WRONG'),
            varient: 'error',
          })
        );
      });
  };

  const handlePrimaryToggle = (index, e, addresses) => {
    const newArray = [...addresses];
    if (e === true) {
      const data = newArray.map((item, i) => {
        if (i == index) {
          return { ...item, is_primary: true };
        } else {
          return { ...item, is_primary: false };
        }
      });

      return data;
    }
    return newArray;
  };

  // Country List
  const getCountryList = () => {
    setLoading1(true);
    getCountryDropDown()
      .then((response) => {
        if (response.data.success) {
          const countryFind = [];
          let result = response.data.data.allCountries?.find((item: any) => {
            item?.country_name === 'UAE';
            return {
              id: item?.id,
              label: item?.country_name,
              coordinates: item?.coordinates,
            };
          });
          countryFind.push(result);
          const countryName = countryFind.map((item: any) => {
            return {
              id: item?.id,
              label: item?.country_name,
              coordinates: item?.coordinates,
            };
          });

          setCountryData(countryName);
          setLoading1(false);

          if (selectedAddress) {
            formik.setFieldValue('country', countryName[0]);
          }
          getCities(countryName[0].id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // City list
  const getCities = (id: any) => {
    setLoading2(true);
    getCityByCountryId(id)
      .then((response) => {
        if (response.data.success) {
          const cityName = response.data.data.allCities?.map((item: any) => {
            setCityId(item.id);
            return {
              id: item.id,
              label: item.city_name,
              coordinates: item.coordinates,
            };
          });

          if (selectedAddress) {
            const data = cityName.find((i) => i.id === selectedAddress.city_id);
            formik.setFieldValue('city', data);
          }
          setCityData(cityName);
          setLoading2(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Area list
  useEffect(() => {
    const city: any = formik.values.city;
    if (city?.id) {
      setLoading3(true);
      getAllArea(city?.id)
        .then((response) => {
          const areaNames = response.data.data.allAreas.map((item: any) => {
            return {
              id: item.id,
              label: item.area_name,
              coordinates: item.coordinates,
            };
          });
          setAreaList(areaNames);
          setLoading3(false);

          if (selectedAddress) {
            const data = areaNames.find(
              (i) => i.id === selectedAddress.area_id
            );
            formik.setFieldValue('area_id', data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formik?.values?.city]);
  useEffect(() => {
    if (selectedAddress && !mapAddress?.cord) {
      formik.setFieldValue('address1', selectedAddress.address1);
      formik.setFieldValue('address2', selectedAddress.address2);
      formik.setFieldValue('address_label', selectedAddress.address_label);
      formik.setFieldValue('is_primary', selectedAddress.is_primary);
      setCoordinatesData(selectedAddress.coordinates);
    }
    if (mapAddress?.cord) {
      formik.setFieldValue('address1', mapAddress.address1);
      formik.setFieldValue('address2', mapAddress.address2);
      setCoordinatesData(mapAddress.cord);
    }
    getCountryList();
  }, [selectedAddress, mapAddress]);
  useEffect(() => {
    viewPageEvent(mPage.addressEdit, currentCity, prevLocation);
  }, []);
  return (
    <>
      <Card
        className={`${size < 768 && css.mobileAddressCard} ${css.addAddress}`}
      >
        {size < 768 ? (
          <>
            <div className={`RTLAccountHeading`}>
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
              </Button>
            </div>
            <div className={`${css.accountHeader} RTLAccountHeader`}>
              <p className={css.accountTitle}>{t('ADD_NEW_ADDRESS')}</p>
            </div>
          </>
        ) : (
          <h1>{t('ADD_NEW_ADDRESS')}</h1>
        )}
        <div className={css.accountMobTopSet}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="form">
              {/* Edit address form */}
              {localeLang === 'en' ? (
                <EditAddressForm
                  formik={formik}
                  coordinatesData={coordinatesData}
                  countryData={countryData}
                  isLoading1={isLoading1}
                  isLoading2={isLoading2}
                  cityData={cityData}
                  areaList={areaList}
                  mapAddress={mapAddress}
                  setCoordinatesData={setCoordinatesData}
                  isLoading3={isLoading3}
                />
              ) : (
                <EditAddressFormAr
                  formik={formik}
                  coordinatesData={coordinatesData}
                  countryData={countryData}
                  isLoading1={isLoading1}
                  isLoading2={isLoading2}
                  cityData={cityData}
                  areaList={areaList}
                  mapAddress={mapAddress}
                  setCoordinatesData={setCoordinatesData}
                  isLoading3={isLoading3}
                />
              )}
            </form>
          </FormikProvider>
        </div>
      </Card>
    </>
  );
};
export default AddressEditAr;
