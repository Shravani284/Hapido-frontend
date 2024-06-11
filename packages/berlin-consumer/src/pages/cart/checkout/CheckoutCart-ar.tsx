import {
  Grid,
  Card,
  CardContent,
  Box,
  FormControlLabel,
  Radio,
} from '@mui/material';
import css from '../Cart.module.scss';
import creditCard from '../../../../assets/creditCard.png';
import PaymentInputsAr from './cardInput';
import visacircleIcon from '../../../../assets/visacircleIcon.svg';
import visaIcon from '../../../../assets/visaIcon.svg';
import Switch from '@mui/material/Switch';
import { PaymentInputsWrapper } from 'react-payment-inputs';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import { checkoutDummyData } from '../../../../../data';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useWindowSize } from 'berlin-common';
import ResponsiveSaveCard from './ResponsiveSaveCard';
import IndicationBars from '../../../components/indicationBar';

const CheckoutCartAr = () => {
  const { t } = useTranslation('translation');
  const [checkedCard, setCheckedCard] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const { size } = useWindowSize();

  const handleChange = () => {
    setCheckedCard(!checkedCard);
  };

  const selectedCard = (e: number) => {
    setActiveCard(e);
  };

  // CVV Validation
  // const saveCardCvv = (e: any) => {
  //   if (/^[0-9]{3,4}$/.test(e)) {
  //     console.log('first', true);
  //   } else {
  //     console.log('first', false);
  //   }
  // };

  return (
    <>
      {size < 768 ? (
        <ResponsiveSaveCard />
      ) : (
        ''
        // <Card className={css.cartDesign}>
        //   <CardContent>
        //     <Box className={css.checkoutCart}>
        //       <Box className={css.title}>
        //         <h1>{t('SAVE_CARD')}</h1>
        //         <img loading="lazy" src={creditCard} />
        //       </Box>
        //       <Box>
        //         <h2>{t('COMING_SOON')}</h2>{' '}
        //       </Box>
        //       {/* <Box>
        //         <Box mt={1} className={css.cardInfo}>
        //           <p>{t('LIST_OF_ALL_CARDS_YOU_SAVED')}</p>
        //         </Box>
        //         {checkoutDummyData.map((item, index) => (
        //           <div
        //             className={
        //               activeCard === index
        //                 ? 'paymentWrapper selectedBorder'
        //                 : 'paymentWrapper '
        //             }
        //             onClick={() => selectedCard(index)}
        //           >
        //             <PaymentInputsWrapper
        //               error={''}
        //               focused={false}
        //               isTouched={false}
        //             >
        //               <Box
        //                 key={index}
        //                 className="saveCard"
        //                 display={'flex'}
        //                 alignItems={'center'}
        //               >
        //                 <Box display={'flex'} alignItems={'center'}>
        //                   <div>
        //                     <img
        //                       loading="lazy"
        //                       src={visaIcon}
        //                       alt={t('CARD')}
        //                       className="cardImg"
        //                     />
        //                   </div>

        //                   {/* CardNumber
        //                   <div className="cardNo">
        //                     {t('CARD_ENDING_IN')}
        //                     <span>{item.cardNumber}</span>
        //                   </div>
        //                 </Box>

        //                 {/* CVV
        //                 {activeCard === index ? (
        //                   <Box
        //                     display={'flex'}
        //                     alignItems={'baseline'}
        //                     maxWidth={'100px'}
        //                   >
        //                     <input
        //                       placeholder={item.cvv}
        //                       className="cvv"
        //                       maxLength={3}
        //                       // onChange={(e) => saveCardCvv(e.target.value)}
        //                     />
        //                     <HelpOutlineIcon className="icon" />
        //                   </Box>
        //                 ) : null}
        //               </Box>
        //             </PaymentInputsWrapper>
        //           </div>
        //         ))}
        //       </Box> */}
        //     </Box>
        //   </CardContent>
        // </Card>
      )}
      {/* //TODO: temp commented */}
      {/* <Card className={css.cartDesign}>
          <CardContent>
            <Grid container className={css.checkoutCart}>
              <Grid item lg={12} md={12} sm={12} xs={12} className={css.title}>
                <h1>{t('ADD_NEW_CARD')}</h1>
                <img loading="lazy" src={creditCard} />
              </Grid>
  
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <PaymentInputsAr />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={css.acceptBox}
              >
                <p>Accepted</p>
                <img loading="lazy" src={visaIcon} alt={t('VISA')}" />
                <img loading="lazy" src={visacircleIcon} alt={t('VISA')}" />
                <img loading="lazy" src={visaIcon} alt={t('VISA')}" />
                <img loading="lazy" src={visacircleIcon} alt={t('VISA')}" />
              </Grid>
  
              <Grid className={css.switchButton}>
                <Switch
                  checked={checkedCard}
                  onClick={handleChange}
                  value={checkedCard}
                />
                <h6>Remember This Card</h6>
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
    </>
  );
};

export default CheckoutCartAr;
