import {
	FETCH_MYUPLOADS,
	DELETE_MYUPLOADS,
	FETCH_OTHERMES,
	FETCH_OTHERMES_PICTURE,
	FETCH_MYCOLLECTION,
	DELETE_COLLECTION_PICTURE,
	PHOTO_CLAIM_FAIL,
	FETCH_TAGS,
	PHOTO_ERROR_RESET,
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
		
		case FETCH_TAGS:
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

		case DELETE_COLLECTION_PICTURE:
			return {
				...photo,
				collection: photo.collection.filter(p => p.id !== action.payload),
			};

		case PHOTO_CLAIM_FAIL:
			return {
				...photo,
				error: action.payload,
			};

		case PHOTO_ERROR_RESET:
			return {
				...photo,
				error: null,
			};

		default:
			return photo;
	}
};
