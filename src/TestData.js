import * as FlashcardsAPI from './api/FlashcardsAPI';

/**
 * Test for the FlashardcardsAPI.
 */
export function testFlashcardsAPI() {
    const card1 = {
        question: 'What is the purpose of redux?',
        answer: 'To manage the application state.'
    };
    const card2 = {
        question: 'Native: What are the components to handle tapping gestures?',
        answer: 'Button, TouchableOpacity, TouchableHighlight'
    };

    FlashcardsAPI.clearDecks().then(() => {
        console.info('Cleared decks.');

        FlashcardsAPI.saveDeckTitle('React, Redux and React Native').then(() => {
        FlashcardsAPI.saveDeckTitle('Artificial Intelligence').then(() => {

            FlashcardsAPI.addCardToDeck('React, Redux and React Native', card1).then(() => {
            FlashcardsAPI.addCardToDeck('React, Redux and React Native', card2).then(() => {
                console.info('Added 2x cards.');

                FlashcardsAPI.getDecks().then((decks) => {
                    console.info('Got decks:\n' + JSON.stringify(decks));
                })
            })})
        })
        })
    });
}
