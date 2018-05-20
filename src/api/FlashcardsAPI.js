import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'Udaci:Flashcards:All'

/**
 * Builds the initial application state.
 */
function getInitialDecks() {
    return {};
}

/**
 * Gets all decks along with their titles, questions, and answers.
 *
 * Example:
 *
 * {
 *   React: {
 *     title: 'React',
 *     questions: [{
 *         question: 'What is React?',
 *         answer: 'A library for managing user interfaces'
 *       }, {
 *         question: 'Where do you make Ajax requests in React?',
 *         answer: 'The componentDidMount lifecycle event'
 *       }]
 *   },
 *   JavaScript: {
 *     title: 'JavaScript',
 *     questions: [{
 *         question: 'What is a closure?',
 *         answer: 'The combination of a function and ... declared.'
 *       }]
 *   }
 * }
 *
 * @return A Promise object.
 */
export function getDecks() {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
        .then(value =>
            (!value) ? getInitialDecks() : JSON.parse(value)
        );
}

/**
 * The deck associated with the id argument, otherwise undefined.
 *
 * @return A Promise object.
 */
export function getDeck(deckId) {
  return getDecks()
      .then(decks => decks[deckId]);   // undefined if not set
}

/**
 * Removes all decks from the storage.
 *
 * @return A Promise object.
 */
export function clearDecks() {
    const decks = getInitialDecks();
    return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
}


/**
 * Adds a new deck with the specified title.
 *
 * @param title The title of the associated deck.
 * @return A Promise object.
 */
export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }));
}

/**
 * Adds a new card to the indicated deck.
 *
 * @param title The title of the associated deck.
 * @param card The card to be added to the list of questions.
 * @return A Promise object.
 */
export function addCardToDeck(title, card) {
    return getDecks()
        .then(decks => {
            const deck = decks[title];
            if (deck && deck.questions) {
                deck.questions.push(card);
                return deck.questions;
            }
            return [];
        })
        .then(questions => {
            return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
                [title]: {
                    questions
                }
            }));
        });
}

