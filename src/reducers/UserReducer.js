/*
 src/reducers/simpleReducer.js
*/

export default (state = {}, action) => {
    switch (action.type) {
    case 'SET_AUTHORIZATION_USER':
        return {
            authorization: action.data.authorization,
            user:          action.data.user,
        }
    case 'SET_AUTHORIZATION':
        return Object.assign({}, state, {
            authorization: action.data,
        });
    case 'LOGOUT':
        return {};
    default:
        return state;
    }
}