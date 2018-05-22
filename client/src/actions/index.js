import * as types from '../constants/ActionTypes'

export const searchPic = (query) => {
    return {
        type: SEARCH_PIC,
        query
    }
}