import React, { Component } from 'react';

import MyStoreCheckout from './payment/MyStoreCheckout';

class Billings extends Component {
  render() {
    return (
      <div className="Billings">
        <div
          className="BillingCheckoutForm"
          style={{ margin: '0 auto', padding: '10px', maxWidth: '700px' }}
        >
          <MyStoreCheckout fontSize="14px" />
        </div>
      </div>
    );
  }
}

export default Billings;
