/*
 src/reducers/simpleReducer.js
*/

export default (state = {}, action) => {
    switch (action.type) {
    case 'SET_USER':
        return {
            authorization: action.data.authorization,
            user:          action.data.user,
        }
    default:
        return state;
    }
}