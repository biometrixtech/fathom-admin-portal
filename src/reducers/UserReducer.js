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
        return {
            authorization: action.data.authorization,
        }
    default:
        return state;
    }
}