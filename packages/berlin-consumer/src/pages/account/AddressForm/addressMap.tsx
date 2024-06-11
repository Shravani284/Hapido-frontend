import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { useWindowSize } from 'berlin-common';
import css from './Address.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate } from 'react-router-dom';
import search from '../../../../assets/Vector.svg';
import { MAP_KEY } from '../../../../../../urlConst';
import Autocomplete from 'react-google-autocomplete';
import { lang } from '../../../utils/getLang';
import axios from 'axios';
import { mPage, viewPageEvent } from '../../../utils/moEngage';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
const MapContainer = (props: any) => {
  const location = useLocation();
  const { size } = useWindowSize();
  const receivedData = location.state && location.state.data;
  const [mapAddress, setMapAddress] = useState<any>({});
  const navigate = useNavigate();
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  const { i18n, t } = useTranslation('translation');
  const [mapCenter, setMapCenter] = useState({
    lat: 25.276987,
    lng: 55.296249,
  });

  const onMapReady = (mapProps: any, map: any) => {
    // You can access the map instance here
  };

  const onMapClick = (mapProps: any, map: any, clickEvent: any) => {
    const { latLng } = clickEvent;
    setMapCenter({ lat: latLng.lat(), lng: latLng.lng() });
  };

  const handleLocateMeClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
      });
    }
  };

  const handleConfirmLocation = () => {
    if (receivedData?.selectedAddress?.id) {
      navigate(`/${lang}/addresses/edit/${receivedData?.selectedAddress?.id}`, {
        state: {
          data: { ...receivedData },
          mapAddress: mapAddress,
        },
      });
    } else {
      navigate(`/${lang}/addresses/add`, {
        state: {
          data: { ...receivedData },
          mapAddress: mapAddress,
        },
      });
    }
  };
  useEffect(() => {
    viewPageEvent(mPage.map, currentCity, prevLocation);
  }, []);
  useEffect(() => {
    if (receivedData?.selectedAddress?.coordinates) {
      const lat = receivedData?.selectedAddress?.coordinates?.split(',');
      setMapCenter({ lat: lat[0], lng: lat[1] });
    }
  }, [receivedData]);
  return (
    <>
      <div
        className={`${size < 768 && css.mobileAddressCard} ${css.locationMap}`}
      >
        {size < 768 && (
          <>
            <div className={css.accountHeader}>
              <ArrowBackIosIcon
                className={css.mobileArrow}
                onClick={() => navigate(-1)}
              />
              <p className={css.accountTitle}>{t('ADD_NEW_ADDRESS')}</p>
            </div>
          </>
        )}
        <div className={css.inputContainer}>
          <img loading="lazy" src={search} alt={t('SEARCH')} />

          <Autocomplete
            apiKey={MAP_KEY}
            className={css.searchLocationInput}
            style={{ width: '90%' }}
            onPlaceSelected={(place) => {
              setMapCenter({
                lat: place.geometry?.location.lat(),
                lng: place.geometry?.location.lng(),
              });
              let addressLine1 = '';
              let addressLine2 = '';

              const fullAddress = place.formatted_address.split(' ');
              fullAddress.forEach((e, index) => {
                const mid = Math.floor(fullAddress.length / 2);
                if (index < mid) {
                  addressLine1 += e + ' ';
                } else {
                  addressLine2 +=
                    e + (fullAddress.length - 1 !== index ? ' ' : '.');
                }
              });
              setMapAddress({
                address1: addressLine1,
                address2: addressLine2,
                cord: `${place.geometry.location.lat()},${place.geometry.location.lng()}`,
              });
            }}
            options={{
              types: [],
              fields: [],
            }}
          />
        </div>
        {/* @ts-ignore */}
        <Map
          google={props.google}
          oneReady={onMapReady}
          onClick={onMapClick}
          initialCenter={{
            lat: mapCenter.lat,
            lng: mapCenter.lng,
          }}
          center={{
            lat: mapCenter.lat,
            lng: mapCenter.lng,
          }}
          zoom={14}
        >
          {mapCenter.lat !== 0 && (
            <Marker
              position={{
                lat: mapCenter.lat,
                lng: mapCenter.lng,
              }}
            />
          )}
        </Map>
        <div className={css.bottomButton}>
          <button onClick={handleLocateMeClick} className={css.locateButton}>
            {t('LOCATE_ME')}
          </button>
          <button
            onClick={handleConfirmLocation}
            className={
              mapCenter.lat == 25.276987 && mapCenter.lng == 55.296249
                ? css.disabledconfirmLocationButton
                : css.confirmLocationButton
            }
            disabled={mapCenter.lat == 25.276987 && mapCenter.lng == 55.296249}
          >
            {t('CONFIRM_LOCATION')}
          </button>
        </div>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: MAP_KEY,
})(MapContainer);
