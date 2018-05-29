// MyStoreCheckout.js
import React from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm fontSize={this.props.fontSize} />
      </Elements>
    );
  }
}

export default MyStoreCheckout;

// var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
// var elements = stripe.elements();

// // Custom styling can be passed to options when creating an Element.
// const style = {
//   base: {
//     // Add your base input styles here. For example:
//     fontSize: '16px',
//     color: '#32325d',
//   },
// };

// // Create an instance of the card Element.
// const card = elements.create('card', { style });

// // Add an instance of the card Element into the `card-element` <div>.
// card.mount('#card-element');

// card.addEventListener('change', ({ error }) => {
//   const displayError = document.getElementById('card-errors');
//   if (error) {
//     displayError.textContent = error.message;
//   } else {
//     displayError.textContent = '';
//   }
// });

// // Create a token or display an error when the form is submitted.
// const form = document.getElementById('payment-form');
// form.addEventListener('submit', async event => {
//   event.preventDefault();

//   const { token, error } = await stripe.createToken(card);

//   if (error) {
//     // Inform the customer that there was an error.
//     const errorElement = document.getElementById('card-errors');
//     errorElement.textContent = error.message;
//   } else {
//     // Send the token to your server.
//     stripeTokenHandler(token);
//   }
// });

// <form action="/charge" method="post" id="payment-form">
//   <div class="form-row">
//     <label for="card-element">Credit or debit card</label>
//     <div id="card-element">
//       {/* <!-- A Stripe Element will be inserted here. --> */}
//     </div>

//     {/* <!-- Used to display Element errors. --> */}
//     <div id="card-errors" role="alert" />
//   </div>

//   <button>Submit Payment</button>
// </form>;
