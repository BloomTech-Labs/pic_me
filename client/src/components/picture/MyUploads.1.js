import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import '../picture/Tags.css';
import { deletemyuploads, myuploads, mytags } from '../../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const keyCodes = {
	comma: 188,
	enter: 13
};

const delimiters = [keyCodes.comma, keyCodes.enter];

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
			selectedId: ''
		};

		this.toggle = this.toggle.bind(this);
	}

	// toggle for modal window
	toggle = imgId => {
		this.setState({
			selectedId: imgId,
			modal: !this.state.modal
		});
	}

	deleteUploadButtonClickedHandler = _ => {
		this.props.deletemyuploads(this.state.selectedId);
		this.toggle();
	};

	handleDelete = i => {
		console.log(i);	
	};

	handleAddition = tag => {
		console.log(tag);
	};

	// handleDrag = (tag, currPos, newPos) => {
	// 	const tags = [...this.state.tags];
	// 	const newTags = tags.slice();

	// 	newTags.splice(currPos, 1);
	// 	newTags.splice(newPos, 0, tag);

	// 	this.setState({ tags: newTags });
	// };

	handleTagClick = img => {
		console.log(img);
	}

	componentWillMount() {
		this.props.myuploads();
		this.props.mytags();
	}

	componentDidMount() {
		this.setState({ 
			uploads: this.props.uploads,
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ uploads: nextProps.uploads });
	}

	render() {
		return <div>
				<h2> My Uploads </h2>
				<ul>
					{this.state.uploads.map(img => 
						<li key={img.id}>
							<img src={img.url} height={300} alt="myuploads" />
						<ReactTags
							inline
							tags={img.tags}
							handleDelete={this.handleDelete}
							handleAddition={this.handleAddition}
							handleDrag={this.handleDrag}
							delimiters={delimiters}
							handleTagClick={this.handleTagClick}
						/>
						<Button onClick={_ => this.toggle(img.id)}>
							Delete Upload
						</Button>
						<Modal
							isOpen={this.state.modal}
							toggle={this.toggle}
							className={this.props.className}
						>
							<ModalHeader toggle={this.toggle}>
								Are you sure you want to delete this upload??
								</ModalHeader>
							<ModalBody>
								Delete this upload from your uploads (this CANNOT be
								undone)?
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
						</li>
					)}
				</ul>
			</div>;
	}
}

const mapStatetoProps = state => {
	return {
		authenticated: state.auth.authenticated,
		error: state.auth.error,
		uploads: state.photo.uploads,
	};
};

// const MyUploadsWrapped = withStyles(styles)(MyUploads);

export default connect(mapStatetoProps, { myuploads, deletemyuploads, mytags })(MyUploads)
// (
// 	MyUploadsWrapped,
// );
