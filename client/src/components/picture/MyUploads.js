import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deletemyuploads, myuploads } from '../../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
});

class MyUploads extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploads: [],
			modal: false,
			selectedId: '',
		};

		this.toggle = this.toggle.bind(this);
	}

	// toggle for modal window
	toggle(imgId) {
		this.setState({
			selectedId: imgId,
			modal: !this.state.modal,
		});
	}

	deleteUploadButtonClickedHandler = _ => {
		this.props.deletemyuploads(this.state.selectedId);
		this.toggle();
	};

	componentWillMount() {
		this.props.myuploads();
	}

	componentDidMount() {
		this.setState({ uploads: this.props.uploads });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ uploads: nextProps.uploads });
	}

	render() {
		return (
			<div className="container">
				<h2> My Uploads </h2>
				<GridList cellHeight={300} spacing={1} cols={3}>
					{this.state.uploads.map(img => (
						<GridListTile key={img.id} cols={img.cols || 1}>
							<img src={img.url} alt="myuploads" />
							<GridListTileBar
								title={img.tags.map(i => i.text).join(', ')}
								titlePosition="bottom"
								actionIcon={
									<IconButton onClick={_ => this.toggle(img.id)}>
										<DeleteIcon className="text-white" />
									</IconButton>
								}
								actionPosition="right"
							/>
							<Modal
								isOpen={this.state.modal}
								toggle={this.toggle}
								className={this.props.className}
							>
								<ModalHeader toggle={this.toggle}>
									Are you sure you want to delete this upload??
								</ModalHeader>
								<ModalBody>
									Delete this upload from your uploads (this CANNOT be undone)?
								</ModalBody>
								<ModalFooter>
									<Button
										color="primary"
										onClick={_ => this.deleteUploadButtonClickedHandler()}
									>
										Yes
									</Button>{' '}
									<Button color="secondary" onClick={this.toggle}>
										Cancel
									</Button>
								</ModalFooter>
							</Modal>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		authenticated: state.auth.authenticated,
		error: state.auth.error,
		uploads: state.photo.uploads,
	};
};

const MyUploadsWrapped = withStyles(styles)(MyUploads);

export default connect(mapStatetoProps, { myuploads, deletemyuploads })(
	MyUploadsWrapped,
);
