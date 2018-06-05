import { FETCH_MYUPLOADS, DELETE_MYUPLOADS, FETCH_OTHERMES } from '../actions';

const initialState = {
	uploads: [],
	othermes: [],
	error: null,
};

export default (photo = initialState, action) => {
	switch (action.type) {
		case FETCH_MYUPLOADS:
			return {
				...photo,
				uploads: action.payload,
			};

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

		default:
			return photo;
	}
};
