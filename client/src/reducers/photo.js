import { FETCH_MYUPLOADS, DELETE_MYUPLOADS } from '../actions';

const initialState = {
	uploads: [],
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

		default:
			return photo;
	}
};
