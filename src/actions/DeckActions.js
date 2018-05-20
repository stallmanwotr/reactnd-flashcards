import * as Types from './Types';
import * as FlashcardsAPI from '../api/FlashcardsAPI';

/** Action Creators */

function receiveDecks(decks) {
    console.info('receiveDecks:\n' + JSON.stringify(decks));
    return {
        type: Types.RECEIVE_DECKS,
        decks
    };
}

function _createDeck(title) {
    return {
        type: Types.CREATE_DECK,
        title
    };
}

function _addCardToDeck(title, card) {
    return {
        type: Types.ADD_CARD_TO_DECK,
        title,
        card
    };
}


/** Thunks */

export const getDecks = () => dispatch => (
    FlashcardsAPI.getDecks()
        .then(decks =>
            dispatch(receiveDecks(decks)))
);


export const createDeck = (title) => dispatch => (
    FlashcardsAPI.saveDeckTitle(title)
        .then(decks =>
            dispatch(_createDeck(title)))
);

export const addCardToDeck = (title, card) => dispatch => (
    FlashcardsAPI.addCardToDeck(title, card)
        .then(() =>
            dispatch(_addCardToDeck(title, card)))
);

