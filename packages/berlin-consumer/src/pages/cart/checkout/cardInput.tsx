import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs';
import creditCard from '../../../../assets/creditCard.png';
import visaIcon from '../../../../assets/visaIcon.svg';
import cardError from '../../../../assets/cardError.svg';
import cvvCard from '../../../../assets/cvvCard.svg';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import { checkoutData } from '../../../../../data';
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function PaymentInputs() {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    // meta
  } = usePaymentInputs();
  const { t } = useTranslation('translation');
  const [formattedCardNumber, setFormattedCardNumber] = useState('');
  const [valid, setValid] = useState<any>(null);
  const [expiryInvalid, setExpiryInvalid] = useState(false);
  const [cvvFocused, setCVVFocused] = useState(false);

  // Handle changes to the card number input
  const handleCardNumberChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 16); // Remove non-numeric characters and limit to 16 digits
    let formattedValue = '';

    if (inputValue.length === 16) {
      const firstFour = inputValue.slice(0, 4);
      const lastFour = inputValue.slice(-4);
      const middleEightHidden = 'xxxx xxxx';
      formattedValue = `${firstFour} ${middleEightHidden} ${lastFour}`;
    } else {
      formattedValue = inputValue;
    }

    setFormattedCardNumber(formattedValue);
    const isValid = /^\d{16}$/.test(inputValue);
    setValid(isValid);
  };

  const getCardImage = () => {
    if (valid === true) {
      return visaIcon; // Valid card image
    } else if (valid === false) {
      return cardError; // Invalid card image
    } else if (cvvFocused === true) {
      return cvvCard;
    } else {
      return creditCard; // Initial image
    }
  };

  const handleExpiryDateChange = (e: { target: { value: string } }) => {
    // Check if the entered expiry date is valid
    const isValidExpiryDate = /^\d{4}$/.test(e.target.value);
    setExpiryInvalid(!isValidExpiryDate);
  };

  return (
    <>
      <div
        className={`paymentWrapperInput ${
          expiryInvalid ? 'invalidExpiry' : ''
        }`}
        style={{
          border: cvvFocused
            ? '1px solid #36A52E'
            : valid === false || expiryInvalid
            ? '1px solid #FF0000'
            : '',
        }}
      >
        {/* {checkoutData.map((item, index) => (
          <PaymentInputsWrapper {...wrapperProps}>
            <Box
              key={index}
              className="saveCard"
              display={'flex'}
              alignItems={'center'}
            >
              <Box display={'flex'} alignItems={'center'}>
                <div>
                  <img
                    loading="lazy"
                    src={getCardImage()}
                    alt={t('CARD')}
                    className="cardImg"
                  />
                </div>
                {/* CardNumber 
                <div className="cardPlace">
                  <input
                    {...getCardNumberProps({
                      onChange: handleCardNumberChange, // Handle card number change
                      value: formattedCardNumber,
                    })}
                    placeholder={item.cardNumber}
                  />
                </div>
              </Box>

              {/* ExpiryDate 
              <Box display={'flex'} alignItems={'center'}>
                <div className="cardPlace">
                  <input
                    {...getExpiryDateProps({
                      onChange: handleExpiryDateChange,
                    })}
                    className={`leftBorder ${
                      expiryInvalid ? 'invalidExpiry' : ''
                    }`}
                    placeholder={item.expiryDate}
                  />
                </div>
                {/* CVV 
                <Box
                  display={'flex'}
                  alignItems={'baseline'}
                  maxWidth={'100px'}
                  className="cardPlace"
                >
                  <input
                    {...getCVCProps({
                      onFocus: () => setCVVFocused(true),
                      onBlur: () => setCVVFocused(false),
                    })}
                    className="leftBorder"
                    placeholder={item.cvv}
                  />
                  <HelpOutlineIcon className="icon" fontSize="small" />
                </Box>
              </Box>
            </Box>
          </PaymentInputsWrapper>
        ))} */}
      </div>
    </>
  );
}
