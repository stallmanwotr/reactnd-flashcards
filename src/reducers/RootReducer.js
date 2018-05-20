import { combineReducers } from 'redux';
import { decksReducer } from './DecksReducer';

/**
 * The root reducer for the application.
 */
export default combineReducers({
    decks: decksReducer
});
