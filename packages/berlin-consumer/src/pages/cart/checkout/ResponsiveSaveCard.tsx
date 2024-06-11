import { Box, Card, CardContent, FormControlLabel, Radio } from '@mui/material';
// import { checkoutDummyData } from '../../../../../data';
import { PaymentInputsWrapper } from 'react-payment-inputs';
import css from '../Cart.module.scss';
import creditCard from '../../../../assets/creditCard.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import visaIcon from '../../../../assets/visaIcon.svg';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ResponsiveSaveCard = () => {
  const { t } = useTranslation('translation');
  const [checkedCard, setCheckedCard] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  const handleChange = () => {
    setCheckedCard(!checkedCard);
  };

  const selectedCard = (e: number) => {
    setActiveCard(e);
  };

  return (
    <>
      {/* //TODO: temp commented
      
      <Card className={css.cartDesign}>
        <CardContent>
          <Box className={css.checkoutCart}>
            {/* <Box className={css.title}>
              <h1> Saved Cards </h1>
              <img loading="lazy" src={creditCard} />
            </Box>
            <Box>
              <h2>{t('COMING_SOON')}</h2>{' '}
            </Box>
            {/* <Box>
              <Box mt={1} className={css.cardInfo}>
                <p>{t('LIST_OF_ALL_CARDS_YOU_SAVED')}</p>
              </Box>

              <div>
                {checkoutDummyData.map((item, index) => (
                  <div
                    className={
                      activeCard === index
                        ? 'paymentWrapper selectedBorder'
                        : 'paymentWrapper '
                    }
                    onClick={() => selectedCard(index)}
                    key={index}
                  >
                    <PaymentInputsWrapper
                      error={''}
                      focused={false}
                      isTouched={false}
                    >
                      <Box
                        className="saveCard"
                        display={'flex'}
                        alignItems={'center'}
                      >
                        <Box display={'flex'} alignItems={'center'}>
                          <div className={`${css.radioButton} radioButtonIcon`}>
                            <FormControlLabel
                              value={index.toString()} // or some unique identifier
                              control={
                                <Radio
                                  checked={activeCard === index}
                                  sx={{
                                    color: '#FC1C15',
                                    '&.Mui-checked': {
                                      color: '#FC1C15',
                                    },
                                  }}
                                />
                              }
                              label=""
                            />
                          </div>
                          <div>
                            <img
                              loading="lazy"
                              src={visaIcon}
                              alt={t('CARD')}
                              className="cardImg"
                            />
                          </div>

                          {/* CardNumber 
                          <div className="cardNo">
                            {t('CARD_ENDING_IN')}
                            <span>{item.cardNumber}</span>
                          </div>
                        </Box>

                        {/* CVV 
                        {activeCard === index ? (
                          <Box
                            display={'flex'}
                            alignItems={'baseline'}
                            maxWidth={'100px'}
                          >
                            <input
                              placeholder={item.cvv}
                              className="cvv"
                              maxLength={3}
                            />
                            <HelpOutlineIcon className="icon" />
                          </Box>
                        ) : null}
                      </Box>
                    </PaymentInputsWrapper>
                  </div>
                ))}
              </div>
            </Box> 
          </Box>
        </CardContent>
      </Card> */}
    </>
  );
};

export default ResponsiveSaveCard;
