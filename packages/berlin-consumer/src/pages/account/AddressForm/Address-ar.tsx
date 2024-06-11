import { Button, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import css from './Address.module.scss';
import add from '../../../../assets/add.svg';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { getUserProfile } from '../../../services/profileService';
import { HapidoLogo, useWindowSize } from 'berlin-common';
import { setSnackbarConfig } from '../../../store/slice/Loader';
import { deleteAddress } from '../../../services/AddressServices';
import { useDispatch, useSelector } from 'react-redux';
import ConsumerConfirmBoxAlert from '../../../components/ConsumerConfirmBoxAlert';
import { useNavigate, useParams } from 'react-router-dom';
import { lang } from '../../../utils/getLang';
import { useTranslation } from 'react-i18next';
import { mPage, viewPageEvent } from '../../../utils/moEngage';
import { MAP_KEY } from '../../../../../../urlConst';
import Helmet from 'react-helmet';
import { SkeletonAddressList } from '../../../components/Skeleton';
import getMetaTags from '../../../utils/getMetaTags';
import OpenInApp from '../../../components/openInApp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { path } from '../../../routes/Routers';

const AddressAr = () => {
  const [profileData, setProfileData] = useState<any>();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [deleteAdd, setDeleteAdd] = useState<number>();
  const [skeltonAddress, setSkeltonAddress] = useState<any>(false);
  const dispatch = useDispatch();
  const { size } = useWindowSize();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);
  // Edit Address
  const handleUpdateHandle = (data: any, index: number) => {
    navigate(`/${lang}/addresses/edit/${data.id}`, {
      state: {
        data: {
          profileData: profileData,
          selectedAddress: data,
          selectedAddressIndex: index,
          // area_id:area_id,
        },
      },
    });
  };
  // Add Address
  const handleClickOpenAdd = () => {
    navigate(`/${lang}/addresses/add`, {
      state: {
        data: {
          profileData: profileData,
          selectedAddress: '',
          selectedAddressIndex: '',
        },
      },
    });
  };
  // Address list
  const getUserData = () => {
    setSkeltonAddress(true);
    getUserProfile()
      .then((res) => {
        const userProfile = res?.data?.user;
        setProfileData(userProfile);
        setSkeltonAddress(false);
      })

      .catch((error) => {
        console.log(error);
        setSkeltonAddress(false);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  //Delete Area
  const deleteUserAddress = (id: any) => {
    setModalOpen(true);
    setDeleteAdd(id);
  };

  const handleDeleteAddress = () => {
    deleteAddress(deleteAdd)
      .then((response) => {
        if (response.success) {
          getUserData();
          dispatch(
            setSnackbarConfig({
              isOpen: true,
              message: t(`ADDRESS_DELETED_SUCCESSFULLY`),
              varient: 'success',
            })
          );
          setModalOpen(false);
        }
        setModalOpen(false);
      })
      .catch((error) => {
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: error.response.data.error.message
              ? error.response.data.error.message
              : t(`SOMETHING_WENT_WRONG`),
            varient: 'error',
          })
        );
      });
    setModalOpen(false);
  };
  useEffect(() => {
    viewPageEvent(mPage.address, currentCity, prevLocation);
  }, []);
  const urlObject = new URL(window.location.href);
  const baseUrlWithoutQueryString = urlObject.origin + urlObject.pathname;
  const HapidoSiteLogo =
    'https://cdn.hapido.com/site-assets/images/hapido-full-logo-white.jpg';

  // meta tags
  const fullMetaArray = {
    title: 'My Addresses - Hapido',
    metaKeywords: 'addresses, location details',
    metaDescription:
      'View and manage your saved addresses for suggesting curated list of deals around your area on Hapido. Add, edit, or delete addresses conveniently.',
    ogType: 'website',
    ogSiteName: 'hapido.com',
    ogLocale: 'en_ae',
    ogURL: baseUrlWithoutQueryString,
    ogTitle: 'My Addresses - Hapido',
    ogDescriptions:
      'View and manage your saved addresses for suggesting curated list of deals around your area on Hapido. Add, edit, or delete addresses conveniently.',
    ogImageWidth: '350',
    ogImageHeight: '350',
    ogImage: HapidoSiteLogo,
    twitterSite: '@hapido',
    twitterCreator: '@hapido',
    twitterImage: HapidoSiteLogo,
    twitterCard: HapidoSiteLogo,
  };

  useEffect(() => {
    getMetaTags(fullMetaArray);
  }, [param]);
  return (
    <>
      {/* // !TODO:Meta Element */}
      {/* <Helmet>
        <title>My Addresses - Hapido</title>
        <meta
          name="description"
          content="View and manage your saved addresses for suggesting curated list of deals around your area on Hapido. Add, edit, or delete addresses conveniently."
        />
        <meta name="keywords" content="addresses, location details" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="hapido.com" />
        <meta property="og:locale" content="en_ae" />
        <meta
          property="og:url"
          content={baseUrlWithoutQueryString}
          data-react-helmet="true"
        />
        <meta
          property="og:title"
          content="My Addresses - Hapido"
          data-react-helmet="true"
        />
        <meta
          property="og:description"
          content="View and manage your saved addresses for suggesting curated list of deals around your area on Hapido. Add, edit, or delete addresses conveniently."
          data-react-helmet="true"
        />
        <meta property="og:image:width" content="350" />
        <meta property="og:image:height" content="350" />
        <meta
          property="og:image"
          content={HapidoLogo}
          data-react-helmet="true"
        />
        {/* <!-- Twitter -->
        <meta name="twitter:site" content="@hapido" />
        <meta name="twitter:creator" content="@hapido" />
        <meta
          name="twitter:image"
          content={HapidoLogo}
          data-react-helmet="true"
        />
        <meta
          name="twitter:card"
          content={HapidoLogo}
          data-react-helmet="true"
        />
      </Helmet> */}
      {size < 768 && <OpenInApp />}
      <Card
        className={`${size < 768 && css.mobileAddressCard} ${
          css.allAddressCard
        }`}
      >
        {size < 768 ? (
          <>
            <div className={`RTLAccountHeading`}>
              <Button onClick={() => navigate(path.MOBILEACCOUNT)}>
                <ArrowBackIosIcon />
              </Button>
            </div>
            <div className={`${css.accountHeader} RTLAccountHeader`}>
              <p className={`${css.accountTitle} RTLAccountTitle`}>
                {t(`ADDRESS`)}
              </p>
              <button className={'RTLAddBtnMob'} onClick={handleClickOpenAdd}>
                {t(`ADD_NEW`)}
              </button>
            </div>
          </>
        ) : (
          <div className={css.title}>
            {t(`ALL_ADDRESSES`)}
            <button
              className={`${css.addBtn} RTLAddAddressBtn`}
              onClick={handleClickOpenAdd}
            >
              <img
                loading="lazy"
                src={add}
                alt={t('ADD_ADDRESS')}
                className={`${css.addSymbol} RTLAddSymbol`}
              />
              {t(`ADD_ADDRESS`)}
            </button>
          </div>
        )}

        <div className={css.accountMobTopSet}>
          {skeltonAddress == true ? (
            <SkeletonAddressList />
          ) : profileData?.addresses?.length > 0 ? (
            profileData?.addresses.map((item: any, index: number) => (
              <div key={item.id}>
                <Card className={css.singleCard}>
                  <div className={`${css.imageContainer} RTLImageContainer`}>
                    <div className={`RTLOverlay`}></div>
                    <label className={`RTLAddressTypeLabel`}>
                      {item.address_label}
                    </label>
                    <img
                      src={`http://maps.googleapis.com/maps/api/staticmap?center=${item.coordinates}&zoom=16&markers=size:large%7Ccolor:red%7C${item.coordinates}&size=400x200&scale=2&key=${MAP_KEY}`}
                      alt={t('SELECTED_LOCATION')}
                      className={css.mapImage}
                    />
                  </div>

                  <div className={css.nameAndAddress}>
                    <div className={`${css.name} RTLName`}>
                      {profileData.first_name} {profileData.last_name}
                    </div>
                    <div className={`${css.address} RTLAddress`}>
                      {item.address1} {item.address2}
                    </div>
                  </div>

                  <div className={css.editAndDelete}>
                    <div
                      className={`${css.editIcon} RTLEditIcon`}
                      onClick={() => handleUpdateHandle(item, index)}
                    >
                      <BorderColorOutlinedIcon />
                    </div>
                    <div className={`${css.deleteIcon} RTLDeleteIcon`}>
                      <DeleteOutlinedIcon
                        onClick={() => deleteUserAddress(item.id)}
                        //
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <h4
              style={{
                textAlign: 'center',
                color: '#FC1C15',
                borderRadius: '25px',
                margin: '100px 0px',
              }}
            >
              {t('NO_ADDRESS')}
            </h4>
          )}
          <ConsumerConfirmBoxAlert
            title={t(`DELETE_ADDRESS`)}
            handleClose={() => setModalOpen(false)}
            message={`${t(`DELETE_THIS_ADDRESS`)}?`}
            open={modalOpen}
            submitHandler={handleDeleteAddress}
          />
        </div>
      </Card>
    </>
  );
};
export default AddressAr;
