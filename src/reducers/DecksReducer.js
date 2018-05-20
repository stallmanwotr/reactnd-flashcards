import * as Types from '../actions/Types';

/**
 * The 'decksReducer' handles all decks, including their cards.
 */
export function decksReducer(state = {}, action) {
    let title, card;

    switch (action.type) {
    case Types.RECEIVE_DECKS:
        return action.decks;

    case Types.CREATE_DECK:
        ({ title } = action);
        return {
            ...state,
            [title]: {
                title,
                questions: []
            }
        };

    case Types.ADD_CARD_TO_DECK:
        ({ title, card } = action);
        if (!state[title] || !Array.isArray(state[title].questions)) {
            return state;
        }
        return {
            ...state,
            [title]: {
                ...state[title],
                questions: state[title].questions.concat([card])
            }
        };

    default:
        return state;
    }
}



