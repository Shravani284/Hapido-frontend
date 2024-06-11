// import React, { useEffect, useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from './paymentStripe';
// import { useLocation } from 'react-router-dom';

// const PaymentPage = () => {
//   const [option, setOption] = useState<any>();
//   const location = useLocation();
//   const optionData = location.state;

//   const stripePromise = loadStripe(
//     'pk_test_51Nd7vSBuM1rWV3Jda4PAcMfHQXvwU0YnFV8vTeEnTYtRPe6JLVVYl0ETOsFWohG84rlYCXwZerQsLrKjqCkJ5NRA00OMeZWgMG'
//   );

//   console.log('optionData', optionData, option);

//   useEffect(() => {
//     setOption({
//       mode: 'payment',
//       // paymentMethodTypes: ['card'],
//       amount: +optionData?.totalAmount,
//       currency: optionData?.currency,
//       // Fully customizable with appearance API.
//       appearance: {},
//     });
//   }, []);
//   return (
//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh', // Adjust the height as needed
//       }}
//     >
//       {option ? (
//         <Elements
//           stripe={stripePromise}
//           options={{ clientSecret: optionData?.clientSecret }}
//         >
//           <CheckoutForm client_secret={optionData?.clientSecret} />
//         </Elements>
//       ) : (
//         <div>Something Went Wrong</div>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './paymentStripe';
// import './App.css';
import axios from 'axios';
import { PUBLIC_KEY } from '../../../../../../urlConst';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  PUBLIC_KEY
);

export default function App() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    var config = {
      method: 'post',
      url: 'http://localhost:4242/create-payment-intent',
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setClientSecret(response.data.clientSecret);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
