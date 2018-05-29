import React, { Component } from 'react';

import MyStoreCheckout from './payment/MyStoreCheckout';

class Billings extends Component {
  render() {
    return (
      <div className="Billings">
        <MyStoreCheckout />
      </div>
    );
  }
}

export default Billings;
