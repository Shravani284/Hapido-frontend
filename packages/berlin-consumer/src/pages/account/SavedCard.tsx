import { useEffect, useState } from 'react';
import css from './SavedCard.module.scss';
import cardlogo from '../../../../berlin-consumer/assets/AuthImg/cardlogo.svg';
import {
  defaultCard,
  deleteCard,
  getAllCards,
} from '../../services/SavedCardService';
import { Card, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ConsumerConfirmBoxAlert from '../../components/ConsumerConfirmBoxAlert';
import { setSnackbarConfig } from '../../store/slice/Loader';
import { useWindowSize } from 'berlin-common';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mPage, viewPageEvent } from '../../utils/moEngage';
import OpenInApp from '../../components/openInApp';
const SavedCard = () => {
  const dispatch = useDispatch();
  const [userCard, setUserCard] = useState([]);
  const [deletePayLoad, setDeletePayLoad] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const { size } = useWindowSize();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('translation');
  const currentCity = useSelector((state: any) => state?.cityName?.name);
  const { prevLocation } = useSelector((state: any) => state?.cityName);

  const allCards = () => {
    getAllCards()
      .then((res) => {
        setUserCard(res.data.userCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    allCards();
  }, []);

  const handleDefault = (e: any) => {
    const payLoad = {
      id: e.id,
      default: true,
    };
    defaultCard(payLoad)
      .then((response) => {
        allCards();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: t(`DEFAULT_CARD_CHANGED_SUCCESSFULLY`),
            varient: 'success',
          })
        );
      })
      .catch((error) => {
        console.log(error);
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
  };

  // Delete Button Api
  const deleteItem = (e: any) => {
    setModalOpen(true);
    setDeletePayLoad(e.id);
  };
  const handleDelete = () => {
    const payLoad = {
      id: deletePayLoad,
      soft_delete: true,
    };
    deleteCard(payLoad)
      .then((response) => {
        allCards();
        dispatch(
          setSnackbarConfig({
            isOpen: true,
            message: t(`CARD_DELETED_SUCCESSFULLY`),
            varient: 'success',
          })
        );
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
  };
  useEffect(() => {
    viewPageEvent(mPage.savedCards, currentCity, prevLocation);
  }, []);
  return (
    <>
      {size < 768 && <OpenInApp />}
      <Card
        variant="outlined"
        className={`${size < 768 && css.mobileSavedCard} ${
          css.savedcardcontainer
        }`}
      >
        <Grid container spacing={3}>
          {size < 768 && (
            <>
              <div className={css.accountHeader}>
                <p className={css.accountTitle}>{t(`SAVED_CARDS`)}</p>
              </div>
            </>
          )}
          <Grid
            className={css.accountMobTopSet}
            item
            xs={12}
            sm={12}
            lg={12}
            xl={12}
          >
            <div className={css.paymentText}>{t(`PAYMENTS`)}</div>
            <div className={css.PaymentDescription}>
              {t(
                'LOREM_IPSUM_DOLOR_SIT_AMET_CONSECTETUR_ADIPISCING_ELIT_MAURIS_SEMPER'
              )}
            </div>{' '}
            {/* //TODO : Value from Backend */}
          </Grid>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            {userCard.map((i: any | object, index: number) => (
              <Card
                variant="outlined"
                className={`${i.default == true && css.cardviewActive} ${
                  css.cardview
                }`}
              >
                <div className={css.CreditcardContainer}>
                  <div className={css.imgSection}>
                    <img
                      loading="lazy"
                      className={css.cardLogo}
                      src={cardlogo}
                      alt={t('CARDLOGO')}
                    />
                    <div>
                      <p className={css.nameText}>{i.card_name}</p>
                      <p className={css.cardEnding}>
                        {t(`ENDING_IN`)}{' '}
                        {i.card_number
                          ?.toString()
                          .slice(i?.card_number?.toString()?.length - 4)}
                      </p>
                    </div>
                  </div>
                  <div className={css.expiryDate}>
                    {t(`EXPIRY`)}: {i.card_expiry_month}/
                    {i.card_expiry_year
                      .toString()
                      .slice(i?.card_expiry_year?.toString()?.length - 2)}
                  </div>
                  <div className={css.actionBtns}>
                    <button
                      onClick={() => deleteItem(i)}
                      className={css.deleteBtn}
                    >
                      {t(`DELETE`)}
                    </button>
                    {i.default == true ? (
                      <button className={css.defaultBtnActive}>
                        {' '}
                        {t(`DEFAULT_CARD`)}
                      </button>
                    ) : (
                      <button
                        className={css.defaultBtn}
                        onClick={() => handleDefault(i)}
                      >
                        {t(`SET_DEFAULT`)}
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Card>
      <ConsumerConfirmBoxAlert
        title={t(`DELETE_CARD`)}
        handleClose={() => setModalOpen(false)}
        message={t(
          `ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_CARD?_THIS_CANNOT_BE_UNDONE`
        )}
        open={modalOpen}
        submitHandler={handleDelete}
      />
    </>
  );
};

export default SavedCard;
