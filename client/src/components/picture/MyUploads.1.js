import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import '../picture/Tags.css';
import { deletemyuploads, myuploads } from '../../actions';
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
	toggle(imgId){
		this.setState({
			selectedId: imgId,
			modal: !this.state.modal
		});
	}

	deleteUploadButtonClickedHandler = _ => {
		this.props.deletemyuploads(this.state.selectedId);
		this.toggle();
	};

	handleDelete = (id) => {
		// const { tags } = this.state;
		console.log(this.state);
		console.log(this.props.uploads);

		// this.setState({
		// 	tags: tags.filter((tag, index) => index !== i)
		// });		
		console.log(id);
	};

	handleAddition = tag => {
		console.log(tag);

		// this.setState(state => ({ tags: [...state.tags, tag] }));
	};

	// handleDrag = (tag, currPos, newPos) => {
	// 	const tags = [...this.state.tags];
	// 	const newTags = tags.slice();

	// 	newTags.splice(currPos, 1);
	// 	newTags.splice(newPos, 0, tag);

	// 	this.setState({ tags: newTags });
	// };

	componentWillMount() {
		this.props.myuploads();
	}

	componentDidMount() {
		console.log(this.props.uploads);
		this.setState({ uploads: this.props.uploads });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ uploads: nextProps.uploads });
	}

	render() {
		return <div>
				<h2> My Uploads </h2>
				<ul>
					{this.state.uploads.map(img => 
						<li key={img.id} tags={img.tags}>
							<img src={img.url} height={300} alt="myuploads" />
						<ReactTags
							inline
							tags={img.tags}
							// suggestions={suggestions}
							handleDelete={this.handleDelete}
							handleAddition={this.handleAddition}
							handleDrag={this.handleDrag}
							delimiters={delimiters}
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


				{/* <GridList cellHeight={600} spacing={1} cols={3}>
					{this.state.uploads.map(img => (
						<GridListTile key={img.id} cols={img.cols || 1}>
							<img src={img.url} alt="myuploads" />
							<GridListTileBar
								title={img.tags.map(i => i.text).join(', ')}
								titlePosition="bottom"
								actionIcon={
									<IconButton onClick={_ => this.toggle(img.id)}>
										<DeleteIcon />
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
						</GridListTile>
					))}
				</GridList> */}
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

export default connect(mapStatetoProps, { myuploads, deletemyuploads })(MyUploads)
// (
// 	MyUploadsWrapped,
// );
