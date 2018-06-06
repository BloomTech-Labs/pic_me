import {
	FETCH_MYUPLOADS,
	DELETE_MYUPLOADS,
	FETCH_OTHERMES,
	FETCH_OTHERMES_PICTURE,
	FETCH_MYCOLLECTION,
} from '../actions';
// import {
//   FETCH_MYUPLOADS,
//   FETCH_BROWSE,
//   DELETE_MYUPLOADS,
//  } from "../actions";

const initialState = {
	uploads: [],
	othermes: [],
	collection: [],
	error: null,
};

export default (photo = initialState, action) => {
	switch (action.type) {
		case FETCH_MYUPLOADS:
			return {
				...photo,
				uploads: action.payload,
			};

		// case FETCH_BROWSE:
		// 	return {
		// 		uploads: action.payload,
		// 	};

		case DELETE_MYUPLOADS:
			return {
				...photo,
				uploads: photo.uploads.filter(photo => photo.id !== action.payload),
			};

		case FETCH_OTHERMES:
			return {
				...photo,
				othermes: action.payload,
			};

		case FETCH_OTHERMES_PICTURE:
			return {
				...photo,
				othermes: photo.othermes.filter(p => p.id !== action.payload),
			};

		case FETCH_MYCOLLECTION:
			return {
				...photo,
				collection: action.payload,
			};

		default:
			return photo;
	}
};
