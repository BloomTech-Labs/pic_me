import React, { Component } from 'react';
import { Button } from 'reactstrap';

import MyStoreCheckout from './payment/MyStoreCheckout';
// import { elementContextTypes } from 'react-stripe-elements/lib/components/Elements';

class Billings extends Component {
	state = {
		selectedPkg: false,
	};

	getCharge = pkg => {
		const prices = {
			sm: 0.99,
			md: 9.99,
			lg: 19.99,
		};

		return prices[pkg];
	};

	packageSelected = e => {
		if (e.target.id === this.state.selectedPkg) {
			this.setState({ selected: false });
			return;
		}

		this.setState({ selectedPkg: e.target.id });
	};

	resetForm = _ => {
		this.setState({ selectedPkg: false });
	};

	render() {
		return (
			<div className="Billings">
				<h3 style={{ margin: '5px 0 0 0', textAlign: 'center' }}>
					Select the number of credits to purchase (USD)
				</h3>
				<div
					className="Packages"
					style={{
						margin: '25px auto',
						maxWidth: '700px',
						// height: '50px',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-around',
					}}
				>
					<Button
						id="sm"
						color="primary"
						size="lg"
						onClick={e => this.packageSelected(e)}
						disabled={this.state.selectedPkg === 'sm'}
					>
						1 ($0.99)
					</Button>{' '}
					<Button
						id="md"
						color="primary"
						size="lg"
						onClick={e => this.packageSelected(e)}
						disabled={this.state.selectedPkg === 'md'}
					>
						15 ($9.99)
					</Button>{' '}
					<Button
						id="lg"
						color="primary"
						size="lg"
						onClick={e => this.packageSelected(e)}
						disabled={this.state.selectedPkg === 'lg'}
					>
						50 ($19.99)
					</Button>{' '}
				</div>

				{this.state.selectedPkg ? (
					<div
						className="CheckoutFormDiv"
						style={{
							margin: '25px auto',
							// padding: '10px',
							maxWidth: '400px',
							height: '250px',
							// background: '#e9f4f8',
						}}
					>
						<div
							className="CancelCheckoutForm"
							style={{
								margin: '10px auto',
								maxWidth: '350px',
							}}
						>
							<Button
								outline
								color="danger"
								style={{
									margin: '10px auto',
									width: '100%',
								}}
								onClick={_ => this.resetForm()}
							>
								Cancel
							</Button>{' '}
						</div>
						<div
							className="BillingCheckoutForm"
							style={{
								margin: '0 auto',
								padding: '10px',
								maxWidth: '400px',
								height: '250px',
								background: '#e9f4f8',
							}}
						>
							<MyStoreCheckout
								fontSize="14px"
								charge={this.getCharge(this.state.selectedPkg)}
								pkg={this.state.selectedPkg}
								history={this.props.history}
							/>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Billings;
