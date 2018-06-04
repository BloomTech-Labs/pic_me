import { 
  FETCH_MYUPLOADS,
  DELETE_MYUPLOADS,
 } from "../actions";

const initialState = {
  uploads: [],
  error: null
};

export default (photo = initialState, action) => {
  switch (action.type) {
    case FETCH_MYUPLOADS:
      return {
        uploads: action.payload
      };

    case DELETE_MYUPLOADS:
      return {
        ...photo
      }
      
    default:
      return photo;
  }
};
