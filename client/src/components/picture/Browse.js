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
import ArrowDownwardIcon from '@material-ui/icons/Star';
import { deletemyuploads, othermephotos } from '../../actions';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 500,
		height: 450,
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)',
	},
	titleBar: {
		background:
			'linear-gradient(to bottom, rgba(207,216,220,0.7) 0%, ' +
			'rgba(207,216,220,0.3) 70%, rgba(207,216,220,0) 100%)',
	},
	icon: {
		color: 'white',
	},
};

class Browse extends Component {
	state = {
		othermes: [],
	};

	renderAlert() {
		if (this.props.error) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.error}
				</div>
			);
		}
	}

	componentWillMount() {
		console.log('auth', this.props.authenticated);
		this.props.othermephotos();
	}

	componentDidMount() {
		this.setState({ othermes: this.props.othermes });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ othermes: nextProps.othermes });
	}

	render() {
		return (
			<div>
				<h2> Other Me </h2>
				<GridList cellHeight={300} spacing={1} cols={3}>
					{this.state.othermes.map(img => (
						<GridListTile key={img.id} cols={img.cols || 1}>
							<img src={img.url} alt="myuploads" />
							<GridListTileBar
								title={img.tags.map(i => i.text).join(', ')}
								titlePosition="bottom"
								actionIcon={
									<IconButton onClick={_ => _}>
										<ArrowDownwardIcon />
									</IconButton>
								}
								actionPosition="right"
							/>
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
		othermes: state.photo.othermes,
	};
};

withStyles(styles)(Browse);
export default connect(mapStatetoProps, { othermephotos, deletemyuploads })(
	Browse,
);
